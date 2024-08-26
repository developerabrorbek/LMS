import Joi from "joi";

export const updateUserSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  username: Joi.string().alphanum().min(5),
  password: Joi.string().alphanum().min(5),
  phone: Joi.string().min(12).max(12),
  birthDate: Joi.date(),
});
