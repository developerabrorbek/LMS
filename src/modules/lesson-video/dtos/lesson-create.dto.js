import Joi from "joi";

export const lessonCreateDto = Joi.object({
  name: Joi.string().required(),
  lessonId: Joi.string().required(),
});
