import Joi from "joi";

export const groupCreateSchema = Joi.object({
  name: Joi.string().required(),
  fieldId: Joi.string().required(),
  classId: Joi.string().required(),
  students: Joi.array().items(Joi.string()),
});
