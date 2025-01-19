import { UnitType } from "../../../types/modelTypes/unitTypes.js";
import ErrorHandler from "../../customError.js";
import { unitValidationSchema } from "../validateSchema/unitValidationSchema.js";

export const isUnitValid = (data: any): UnitType => {
  const { error, value } = unitValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as UnitType;
};
