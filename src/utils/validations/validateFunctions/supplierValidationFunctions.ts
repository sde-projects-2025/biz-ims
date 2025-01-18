import { SupplierType } from "../../../types/modelTypes/supplierTypes.js";
import ErrorHandler from "../../customError.js";
import { supplierValidationSchema } from "../validateSchema/supplierValidationSchema.js";

export const isSupplierValid = (data: any): SupplierType => {
  const { error, value } = supplierValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as SupplierType;
};
