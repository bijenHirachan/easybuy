import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { Product } from "../models/Product.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { title, description, price, inStock } = req.body;

  const file = req.file;

  if (!title || !description || !price || !inStock || !file)
    return next(new ErrorHandler("All fields are required", 400));

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "/easybuy/products",
  });

  const product = await Product.create({
    title,
    description,
    price,
    inStock,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, inStock } = req.body;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (title) product.title = title;
  if (description) product.description = description;
  if (price) product.price = price;
  if (inStock) product.inStock = inStock;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  await cloudinary.v2.uploader.destroy(product.poster.public_id, {
    folder: "/easybuy/products",
  });

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
