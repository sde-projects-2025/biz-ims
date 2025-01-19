import Joi from "joi";

const categoryObject = {
  categoryName: Joi.string().trim().min(3).max(100).required(),
  categoryDesc: Joi.string().trim().min(3).max(255).required(),
  isCategoryActive: Joi.boolean(),
};

export const categoryValidationSchema = Joi.object(categoryObject);
