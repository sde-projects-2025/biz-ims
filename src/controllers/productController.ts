import { Request, Response, NextFunction } from "express";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewProductReqBody } from "../types/modelTypes/productTypes.js";

export const getAllProducts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({})
      .populate("categoryId")
      .populate("unitId");

    return res
      .status(200)
      .json(successResponse(products, "All Products Fetched Successfully"));
  }
);

export const deleteProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return next(new ErrorHandler(`Product ${id} does not Exist!!`, 404));
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedProduct, "Product deleted successfully"));
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const {
    productName,
    productDesc,
    categoryId,
    unitId,
    sku,
    thresholdStock,
    isActive,
    image,
    brand,
  }: NewProductReqBody = req.body;

  const id = req.params.id;

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }

  const existingProductByName = await Product.findOne({
    productName: productName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingProductByName) {
    return next(new ErrorHandler("Product name already exists", 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDesc,
      categoryId,
      unitId,
      sku,
      thresholdStock,
      isActive,
      image,
      brand,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedProduct, "Product Update Successfully"));
});

export const createProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      productName,
      productDesc,
      categoryId,
      unitId,
      sku,
      thresholdStock,
      isActive,
      image,
      brand,
    }: NewProductReqBody = req.body;

    const existingProduct = await Product.findOne({ productName: productName });

    if (existingProduct) {
      return next(new ErrorHandler("Product already Exists!!", 403));
    }

    const newProduct = await Product.create({
      productName: productName,
      productDesc: productDesc,
      categoryId: categoryId,
      unitId: unitId,
      sku: sku,
      thresholdStock: thresholdStock,
      isActive: isActive,
      image: image,
      brand: brand,
    });

    return res
      .status(201)
      .json(successResponse(newProduct, "Product created successfully"));
  }
);

export const getProductById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const product = await Product.findById(id)
      .populate("categoryId")
      .populate("unitId");

    if (!product) {
      return next(new ErrorHandler("Product not found !!", 404));
    }

    return res
      .status(200)
      .json(
        successResponse(product, `Product by id ${id} retrieved successfully`)
      );
  }
);
