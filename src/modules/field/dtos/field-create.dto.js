import Joi from "joi";

export const fieldCreateSchema = Joi.object({
  name: Joi.string().required(),
  parentId: Joi.string(),
});
