import { CategoryType } from "../../../types/modelTypes/categoryTypes.js";
import ErrorHandler from "../../customError.js";
import { categoryValidationSchema } from "../validateSchema/categoryValidationSchema.js";

export const isCategoryValid = (data: any): CategoryType => {
  const { error, value } = categoryValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as CategoryType;
};
