import { Request, Response, NextFunction } from "express";
import Supplier from "../models/supplierModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import {
  ISupplier,
  NewSupplierReqBody,
  SupplierType,
} from "../types/modelTypes/supplierTypes.js";
import { isSupplierValid } from "../utils/validations/validateFunctions/supplierValidationFunctions.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";

export const getAllSuppliersData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const suppliers = await Supplier.find({ isActive: true });

    return res
      .status(200)
      .json(successResponse(suppliers, "Suppliers Data Fetched Successfully"));
  }
);

export const getSupplierById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = isObjectIdValid(req.params.id);

    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return next(new ErrorHandler("Supplier not found !!", 404));
    }

    return res
      .status(200)
      .json(
        successResponse(supplier, `Supplier by id ${id} retrieved successfully`)
      );
  }
);

export const createSupplier = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqObj: NewSupplierReqBody = req.body;

    const supplierObj: SupplierType = {
      ...reqObj,
      isActive: true,
    };

    const validatedSupplier = isSupplierValid(supplierObj);

    const existingSupplier = await Supplier.findOne({
      email: validatedSupplier.email,
    });

    if (existingSupplier)
      return next(new ErrorHandler("Supplier already Exists!!", 403));

    const newSupplier = await Supplier.create(validatedSupplier);

    return res
      .status(201)
      .json(successResponse(newSupplier, "Supplier created successfully"));
  }
);

export const updateSupplier = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: SupplierType = req.body;

  const validatedSupplier = isSupplierValid(reqObj);

  const existingSupplier = await Supplier.findById(id);
  if (!existingSupplier) {
    return next(new ErrorHandler("Supplier Not Found", 404));
  }

  const existingSupplierByName = await Supplier.findOne({
    name: validatedSupplier.name,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingSupplierByName) {
    return next(new ErrorHandler("Supplier name already exists", 400));
  }

  const updatedSupplier = await Supplier.findByIdAndUpdate(
    id,
    validatedSupplier,
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedSupplier, "Supplier Update Successfully"));
});

export const deleteSupplier = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = isObjectIdValid(req.params.id);

    const existingSupplier = await Supplier.findById(id);

    if (!existingSupplier)
      return next(new ErrorHandler(`Supplier does not Exist!!`, 404));

    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedSupplier, "Supplier deleted successfully"));
  }
);
