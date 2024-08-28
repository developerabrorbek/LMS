import Joi from "joi";

export const updateClassDto = Joi.object({
  name: Joi.string(),
  size: Joi.number(),
});
