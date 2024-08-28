import Joi from "joi";

export const groupUpdateSchema = Joi.object({
  name: Joi.string(),
  classId: Joi.string(),
  students: Joi.array().items(Joi.string()),
});
