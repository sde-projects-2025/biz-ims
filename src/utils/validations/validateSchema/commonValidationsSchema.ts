import Joi from "joi";

const idValidationObject = Joi.string().length(24).required().messages({
  "string.base": "ID must be a string.",
  "string.empty": "ID is not valid!!",
  "string.length": "ID must be exactly 24 characters long.",
  "any.required": "ID is not valid!!",
});

export const idValidationSchema = Joi.object({
  id: idValidationObject,
});
