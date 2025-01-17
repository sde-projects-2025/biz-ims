import { Request, Response, NextFunction } from "express";
import Units from "../models/unitModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewUnitReqBody } from "../types/modelTypes/unitTypes.js";

export const getAllUnits = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUnits = await Units.find({});

    return res
      .status(200)
      .json(successResponse(allUnits, "Units Data Fetched Successfully"));
  }
);

export const deleteUnit = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("Unit Id is required.", 400));
    }
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

export const updateUnit = TryCatch(async (req, res, next) => {
  const { unitName, unitAbbreviation }: NewUnitReqBody = req.body;
  if (!unitName || !unitAbbreviation) {
    return next(
      new ErrorHandler("Unit name and abbreviation are required.", 400)
    );
  }
  const id = req.params.id;

  const existingUnit = await Units.findById(id);
  if (!existingUnit) {
    return next(new ErrorHandler("Invalid Unit ID", 400));
  }

  const existingUnitByName = await Units.findOne({
    unitName: unitName,
    unitAbbreviation: unitAbbreviation,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingUnitByName) {
    return next(new ErrorHandler("Unit already exists", 400));
  }

  const updatedUnit = await Units.findByIdAndUpdate(
    id,
    { unitName, unitAbbreviation },
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedUnit, "Unit Updated Successfully"));
});

export const createUnit = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { unitName, unitAbbreviation }: NewUnitReqBody = req.body;
    if (!unitName || !unitAbbreviation) {
      return next(
        new ErrorHandler("Unit name and abbreviation are required.", 400)
      );
    }
    const existingUnitName = await Units.findOne({ unitName });
    const existingUnitAbr = await Units.findOne({ unitAbbreviation });

    if (existingUnitName || existingUnitAbr) {
      return next(new ErrorHandler("Unit already Exists!!", 403));
    }

    const newUnit = Units.create({ unitName, unitAbbreviation }, { new: true });
    return res
      .status(201)
      .json(successResponse(newUnit, "Unit created successfully"));
  }
);

export const getUnitById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const unit = await Units.findById(id);

    if (!unit) {
      return next(new ErrorHandler("Unit not found !!", 404));
    }

    return res
      .status(200)
      .json(successResponse(unit, `Unit by id ${id} retrieved successfully`));
  }
);
