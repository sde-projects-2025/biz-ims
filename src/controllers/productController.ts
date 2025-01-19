import { Request, Response, NextFunction } from "express";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import {
  NewProductReqBody,
  ProductType,
} from "../types/modelTypes/productTypes.js";
import { isProductValid } from "../utils/validations/validateFunctions/productValidationsFunctions.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";

export const getAllProductsData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({ isProductActive: true })
      .populate("categoryId")
      .populate("unitId");

    return res
      .status(200)
      .json(successResponse(products, "Products Data Fetched Successfully"));
  }
);

export const getProductById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = isObjectIdValid(req.params.id);

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

export const createProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqObj: NewProductReqBody = req.body;
    const productObj: ProductType = {
      ...reqObj,
      isProductActive: true,
    };

    const validatedProduct = isProductValid(productObj);

    const existingProduct = await Product.findOne({
      productName: validatedProduct.productName,
    });

    if (existingProduct) {
      return next(new ErrorHandler("Product already Exists!!", 403));
    }

    const newProduct = await Product.create({
      validatedProduct,
    });

    return res
      .status(201)
      .json(successResponse(newProduct, "Product created successfully"));
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: ProductType = req.body;
  const validatedProduct = isProductValid(reqObj);

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const existingProductByName = await Product.findOne({
    productName: validatedProduct.productName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingProductByName) {
    return next(new ErrorHandler("Product name already exists", 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, validatedProduct, {
    new: true,
  });

  return res
    .status(200)
    .json(successResponse(updatedProduct, "Product Update Successfully"));
});

export const deleteProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = isObjectIdValid(req.params.id);

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return next(new ErrorHandler(`Product does not Exist!!`, 404));
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedProduct, "Product deleted successfully"));
  }
);
