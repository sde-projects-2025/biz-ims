import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import {
  NewCategoryReqBody,
  CategoryType,
} from "../types/modelTypes/categoryTypes.js";
import { isCategoryValid } from "../utils/validations/validateFunctions/categoryValidationsFunctions.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";

export const getAllCategoriesData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({ isCategoryActive: true });

    return res
      .status(200)
      .json(
        successResponse(categories, "Categories Data Fetched Successfully")
      );
  }
);

export const getCategoryById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = isObjectIdValid(req.params.id);

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

export const createCategory = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqObj: NewCategoryReqBody = req.body;

    const categoryObj: CategoryType = {
      ...reqObj,
      isCategoryActive: true,
    };

    const validatedCategory = isCategoryValid(categoryObj);

    const existingCategory = await Category.findOne({
      categoryName: validatedCategory.categoryName,
    });

    if (existingCategory) {
      return next(new ErrorHandler("Category already Exists!!", 403));
    }

    const newCategory = await Category.create(validatedCategory);

    return res
      .status(201)
      .json(successResponse(newCategory, "Category created successfully"));
  }
);

export const updateCategory = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: CategoryType = req.body;
  const validatedCategory = isCategoryValid(reqObj);
  const existingCategory = await Category.findById(id);
  if (!existingCategory) {
    return next(new ErrorHandler("Category not found", 400));
  }

  const existingCategoryByName = await Category.findOne({
    categoryName: validatedCategory.categoryName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingCategoryByName) {
    return next(new ErrorHandler("Category Name already exists", 400));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    validatedCategory,
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedCategory, "Category Update Successfully"));
});

export const deleteCategory = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = isObjectIdValid(req.params.id);

    const existingCategory = await Category.findById(id);

    if (!existingCategory)
      return next(new ErrorHandler(`Category ${id} does not Exist!!`, 404));

    const deletedCategory = await Category.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedCategory, "Category deleted successfully"));
  }
);
