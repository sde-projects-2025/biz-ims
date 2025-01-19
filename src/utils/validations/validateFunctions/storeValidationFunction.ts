import { StoreType } from "../../../types/modelTypes/storeTypes.js";
import ErrorHandler from "../../customError.js";
import { storeValidationSchema } from "../validateSchema/storeValidationSchema.js";

export const isStoreValid = (data: any): StoreType => {
  const { error, value } = storeValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as StoreType;
};
