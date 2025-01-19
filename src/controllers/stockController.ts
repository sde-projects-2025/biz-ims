import { TryCatch } from "../middlewares/errorMiddlewares.js";
import Stock from "../models/stockModel.js";
import { NewStockReqBody, StockType } from "../types/modelTypes/stockTypes.js";
import ErrorHandler from "../utils/customError.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";
import { isStockValid } from "../utils/validations/validateFunctions/stockValidationsFunctions.js";

export const getAllStocksDetails = TryCatch(async (req, res, next) => {
  const stocks = await Stock.find({});

  return res
    .status(200)
    .json(successResponse(stocks, "Stocks Details Fetched Successfully"));
});

export const getStocksDetailsById = TryCatch(async (req, res, next) => {
  const id: string = isObjectIdValid(req.params.id);

  const stock = await Stock.findById(id);

  if (!stock) {
    return next(new ErrorHandler("Stock not found !!", 404));
  }

  return res
    .status(200)
    .json(successResponse(stock, `Stock by id ${id} retrieved successfully`));
});

export const addNewStock = TryCatch(async (req, res, next) => {
  const reqObj: NewStockReqBody = req.body;

  const supplierObj: StockType = {
    ...reqObj,
  };

  const validatedStock = isStockValid(supplierObj);

  const newStock = await Stock.create(validatedStock);

  return res
    .status(201)
    .json(successResponse(newStock, "Stock created successfully"));
});

export const updateStockDetails = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: StockType = req.body;

  const validatedStock = isStockValid(reqObj);

  const existingStock = await Stock.findById(id);
  if (!existingStock) {
    return next(new ErrorHandler("Stock Not Found", 404));
  }

  const updatedStock = await Stock.findByIdAndUpdate(id, validatedStock, {
    new: true,
  });

  return res
    .status(200)
    .json(successResponse(updatedStock, "Stock Updated Successfully"));
});

export const deleteStockDetails = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const existingStock = await Stock.findById(id);

  if (!existingStock)
    return next(new ErrorHandler(`Stock does not Exist!!`, 404));

  const deletedStock = await Stock.findByIdAndDelete(id);

  return res
    .status(200)
    .json(successResponse(deletedStock, "Stock deleted successfully"));
});
