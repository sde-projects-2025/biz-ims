import { Request, Response, NextFunction } from "express";
import Units from "../models/unitModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewUnitReqBody } from "../types/modelTypes/unitTypes.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";
import { isUnitValid } from "../utils/validations/validateFunctions/unitValidationsFunctions.js";

export const getAllUnits = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUnits = await Units.find({});

    return res
      .status(200)
      .json(successResponse(allUnits, "Units Data Fetched Successfully"));
  }
);

export const getUnitById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = isObjectIdValid(req.params.id);

    const unit = await Units.findById(id);

    if (!unit) {
      return next(new ErrorHandler("Unit not found !!", 404));
    }

    return res
      .status(200)
      .json(successResponse(unit, `Unit by id ${id} retrieved successfully`));
  }
);

export const createUnit = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqObj: NewUnitReqBody = req.body;

    const unitObj = {
      ...reqObj,
    };

    const validatedUnit = isUnitValid(unitObj);

    const existingUnit = await Units.findOne({
      $or: [
        { unitName: validatedUnit.unitName },
        { unitAbbreviation: validatedUnit.unitAbbreviation },
      ],
    });

    if (existingUnit) {
      return next(new ErrorHandler("Unit already Exists!!", 403));
    }

    const newUnit = await Units.create(validatedUnit);
    return res
      .status(201)
      .json(successResponse(newUnit, "Unit created successfully"));
  }
);

export const updateUnit = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const reqObj: NewUnitReqBody = req.body;

  const validatedUnit = isUnitValid(reqObj);

  const existingUnit = await Units.findById(id);
  if (!existingUnit) {
    return next(new ErrorHandler("Invalid Unit ID", 400));
  }

  const existingUnitByAbbre = await Units.findOne({
    unitAbbreviation: validatedUnit.unitAbbreviation,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingUnitByAbbre) {
    return next(new ErrorHandler("Unit already exists", 400));
  }

  const updatedUnit = await Units.findByIdAndUpdate(id, validatedUnit, {
    new: true,
  });

  return res
    .status(200)
    .json(successResponse(updatedUnit, "Unit Updated Successfully"));
});

export const deleteUnit = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = isObjectIdValid(req.params.id);

    const existingUnit = await Units.findById(id);

    if (!existingUnit) {
      return next(new ErrorHandler(`Unit ${id} does not Exist!!`, 404));
    }

    const deletedUnit = await Units.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedUnit, "Unit deleted successfully"));
  }
);
