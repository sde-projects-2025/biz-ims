import ErrorHandler from "../../customError.js";
import { idValidationSchema } from "../validateSchema/commonValidationsSchema.js";

export const isObjectIdValid = (data: any): string => {
  const { error, value } = idValidationSchema.validate(
    { id: data },
    {
      abortEarly: false,
    }
  );

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value.id as string;
};
