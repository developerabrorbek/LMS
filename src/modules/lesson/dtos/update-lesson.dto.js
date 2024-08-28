import Joi from "joi";

export const updateLessonDto = Joi.object({
  name: Joi.string().required(),
});
