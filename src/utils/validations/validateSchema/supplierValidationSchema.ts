import Joi from "joi";

const supplierObject = {
  name: Joi.string().trim().min(3).max(100).required(),
  contactPersonName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone must be a valid number with 10 to 15 digits.",
    }),
  email: Joi.string().trim().email().required(),
  address: Joi.string().trim().min(5).max(255).required(),
  isActive: Joi.boolean(),
};

export const supplierValidationSchema = Joi.object(supplierObject);
