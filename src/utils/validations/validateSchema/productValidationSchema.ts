import Joi from "joi";

const productObject = {
  productName: Joi.string().trim().min(3).max(100).required(),
  productDesc: Joi.string().trim().min(5).max(255).required(),
  categoryId: Joi.string().trim().length(24).required(),
  unitId: Joi.string().trim().length(24).required(),
  sku: Joi.string().trim().min(5).max(100).required(),
  isProductActive: Joi.boolean(),
  image: Joi.string().trim().min(5).max(100).required(),
  thresholdStock: Joi.number().required(),
  brand: Joi.string().trim().min(5).max(100).required(),
};

export const productValidationSchema = Joi.object(productObject);
