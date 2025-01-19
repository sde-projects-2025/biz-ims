import Joi from "joi";

const stockObject = {
  productId: Joi.string().trim().length(24).required().messages({
    "string.length": "product Id must be exactly 24 characters long.",
  }),
  storeId: Joi.string().trim().length(24).required().messages({
    "string.length": "store Id must be exactly 24 characters long.",
  }),
  supplierId: Joi.string().trim().length(24).required().messages({
    "string.length": "supllier Id must be exactly 24 characters long.",
  }),
  costPrice: Joi.number().required(),
  sellingPrice: Joi.number().required(),
  quantity: Joi.number().required(),
  purchaseDate: Joi.date().required(),
};

export const stockValidationSchema = Joi.object(stockObject);
