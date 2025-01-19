import { StockType } from "../../../types/modelTypes/stockTypes.js";
import ErrorHandler from "../../customError.js";
import { stockValidationSchema } from "../validateSchema/stockValidationsSchema.js";

export const isStockValid = (data: any): StockType => {
  const { error, value } = stockValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as StockType;
};
