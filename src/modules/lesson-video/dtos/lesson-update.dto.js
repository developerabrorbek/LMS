import Joi from "joi";

export const lessonUpdateDto = Joi.object({
  name: Joi.string().required(),
});
