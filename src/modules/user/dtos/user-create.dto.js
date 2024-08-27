import Joi from "joi";

export const createUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  username: Joi.string().alphanum().min(5).required(),
  password: Joi.string().alphanum().min(5).required(),
  phone: Joi.string().min(12).max(12).required(),
  role: Joi.string().valid("student", "teacher", "admin", "super-admin"),
  birthDate: Joi.date().required(),
  image_url: Joi.string(),
  email: Joi.string().email().required(),
});
