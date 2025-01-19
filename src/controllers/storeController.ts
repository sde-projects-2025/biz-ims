import { Request, Response, NextFunction } from "express";
import Store from "../models/storeModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewStoreReqBody, StoreType } from "../types/modelTypes/storeTypes.js";
import { isStoreValid } from "../utils/validations/validateFunctions/storeValidationFunction.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";

export const getAllStoresData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const stores = await Store.find({ isStoreActive: true });

    return res
      .status(200)
      .json(successResponse(stores, "Stores Data Fetched Successfully"));
  }
);

export const getStoreById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = isObjectIdValid(req.params.id);

    const store = await Store.findById(id);

    if (!store) {
      return next(new ErrorHandler("Store not found !!", 404));
    }

    return res
      .status(200)
      .json(successResponse(store, `store by id ${id} retrieved successfully`));
  }
);

export const createStore = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqObj: NewStoreReqBody = req.body;

    const storeObj: StoreType = {
      ...reqObj,
      isStoreActive: true,
    };

    const validatedStore = isStoreValid(storeObj);

    const existingStore = await Store.findOne({
      storeName: validatedStore.storeName,
    });

    if (existingStore)
      return next(new ErrorHandler("Store already Exists!!", 403));

    const newStore = await Store.create(validatedStore);

    return res
      .status(201)
      .json(successResponse(newStore, "Store created successfully"));
  }
);

export const updateStore = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: StoreType = req.body;

  const validatedStore = isStoreValid(reqObj);

  const existingStore = await Store.findById(id);
  if (!existingStore) {
    return next(new ErrorHandler("Store Not Found", 404));
  }

  const existingStoreByName = await Store.findOne({
    storeName: validatedStore.storeName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingStoreByName) {
    return next(new ErrorHandler("Store name already exists", 400));
  }

  const updatedStore = await Store.findByIdAndUpdate(id, validatedStore, {
    new: true,
  });

  return res
    .status(200)
    .json(successResponse(updatedStore, "Store Update Successfully"));
});

export const deleteStore = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = isObjectIdValid(req.params.id);

    const existingStore = await Store.findById(id);

    if (!existingStore)
      return next(new ErrorHandler(`Store does not Exist!!`, 404));

    const deletedStore = await Store.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedStore, "Store deleted successfully"));
  }
);
