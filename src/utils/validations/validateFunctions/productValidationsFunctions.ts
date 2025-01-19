import { ProductType } from "../../../types/modelTypes/productTypes.js";
import ErrorHandler from "../../customError.js";
import { productValidationSchema } from "../validateSchema/productValidationSchema.js";

export const isProductValid = (data: any): ProductType => {
  const { error, value } = productValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as ProductType;
};
