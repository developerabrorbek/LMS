import Joi from "joi";

export const createClassDto = Joi.object({
  name: Joi.string().required(),
  size: Joi.number().required(),
});
