import Joi from "joi";

const unitObject = {
  unitName: Joi.string().trim().min(2).max(25).required(),
  unitAbbreviation: Joi.string().trim().min(2).max(10).required(),
};

export const unitValidationSchema = Joi.object(unitObject);
