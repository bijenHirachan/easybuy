import express from "express";
import {
  changePassword,
  forgotPassword,
  getUsers,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users").get(getUsers).post(register);
router.route("/login").post(login);
router.route("/changepassword").put(isAuthenticated, changePassword);
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router.route("/logout").get(isAuthenticated, logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);

export default router;
