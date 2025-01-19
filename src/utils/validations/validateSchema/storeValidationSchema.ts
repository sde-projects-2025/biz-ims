import Joi from "joi";

const storeObject = {
  storeName: Joi.string().trim().min(3).max(100).required(),
  storeAddress: Joi.string().trim().min(5).max(255).required(),
  storeContact: Joi.string()
    .trim()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone must be a valid number with 10 to 15 digits.",
    }),
  storeManagerId: Joi.string().trim().length(24).required(),
  isStoreActive: Joi.boolean(),
};

export const storeValidationSchema = Joi.object(storeObject);
