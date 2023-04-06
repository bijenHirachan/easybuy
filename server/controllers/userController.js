import { User } from "../models/User.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const getUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("All fields are required", 400));

  const userExist = await User.findOne({ email });

  if (userExist)
    return next(new ErrorHandler("Email has already been taken", 400));

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "test",
      url: "url",
    },
  });

  sendToken("User registered successfully", user, res, 201);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("All fields are required", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User doesn't exist", 404));

  const isMatch = await user.comparePasswords(password);

  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 400));

  sendToken("Logged in successfully", user, res, 200);
});

export const changePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("All fields are required", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePasswords(oldPassword);

  if (!isMatch)
    return next(new ErrorHandler("Your old password is incorrect", 401));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User doesn't exist", 404));

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. \n ${url} \n If you haven't requested then you can ignore this mail.`;

  await sendEmail(user.email, "EASYBUY | Reset Password", message);

  return res.status(200).json({
    success: true,
    message: `Reset token has been sent to ${user.email} successfully`,
  });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(
      new ErrorHandler("Reset Token is invalid or has been expired", 404)
    );

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
