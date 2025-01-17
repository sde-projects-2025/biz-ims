import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewCategoryReqBody } from "../types/modelTypes/categoryTypes.js";

export const getAllCategories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({});

    return res
      .status(200)
      .json(
        successResponse(categories, "Categories Data Fetched Successfully")
      );
  }
);

export const deleteCategory = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return next(new ErrorHandler(`Category ${id} does not Exist!!`, 404));
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedCategory, "Category deleted successfully"));
  }
);

export const updateCategory = TryCatch(async (req, res, next) => {
  const { categoryName, categoryDesc }: NewCategoryReqBody = req.body;
  const id = req.params.id;

  if (!categoryName || !categoryDesc) {
    return next(
      new ErrorHandler("Category name and description are required.", 400)
    );
  }
  const existingCategory = await Category.findById(id);
  if (!existingCategory) {
    return next(new ErrorHandler("Invalid Category ID", 400));
  }

  const existingCategoryByName = await Category.findOne({
    categoryName: categoryName,
    categoryDesc: categoryDesc,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingCategoryByName) {
    return next(new ErrorHandler("Category Name already exists", 400));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { categoryName, categoryDesc },
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedCategory, "Category Update Successfully"));
});

export const createCategory = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, categoryDesc }: NewCategoryReqBody = req.body;

    if (!categoryName || !categoryDesc) {
      return next(
        new ErrorHandler("Category name and description are required.", 400)
      );
    }
    const existingCategory = await Category.findOne({
      categoryName: categoryName,
      categoryDesc: categoryDesc,
    });

    if (existingCategory) {
      return next(new ErrorHandler("Category already Exists!!", 403));
    }

    const newCategory = await Category.create({ categoryName, categoryDesc });

    return res
      .status(201)
      .json(successResponse(newCategory, "Category created successfully"));
  }
);

export const getCategoryById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return next(new ErrorHandler("Category not found !!", 404));
    }

    return res
      .status(200)
      .json(
        successResponse(category, `Category by id ${id} fetched successfully`)
      );
  }
);
