import Joi from "joi";

export const createLessonDto = Joi.object({
  name: Joi.string().required(),
  groupId: Joi.string().required(),
});
