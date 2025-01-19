import { UserType } from "../../../types/modelTypes/userTypes.js";
import ErrorHandler from "../../customError.js";
import { userValidationSchema } from "../validateSchema/userValidationSchemas.js";

export const isUserValid = (data: any): UserType => {
  const { error, value } = userValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value as UserType;
};
