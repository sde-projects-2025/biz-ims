import Joi from "joi";

const userObject = {
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(30).required(),
  roleId: Joi.string().trim().length(24).required(),
  storeId: Joi.string().trim().length(24).required(),
  isActive: Joi.boolean(),
};

export const userValidationSchema = Joi.object(userObject);
