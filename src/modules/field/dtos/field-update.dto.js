import Joi from "joi";

export const fieldUpdateSchema = Joi.object({
  name: Joi.string().required(),
});
