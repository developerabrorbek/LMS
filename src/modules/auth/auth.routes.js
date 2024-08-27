import { Router } from "express";
import authController from "./auth.controller.js";
import { loginSchema } from "./dtos/login.dto.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { forgotPasswordDto } from "./dtos/forgot-password.dto.js";
import { resetPasswordDto } from "./dtos/reset-password.dto.js";

const authRoutes = Router();

authRoutes
  .post("/login", ValidationMiddleware(loginSchema), authController.signin)
  .post("/register", ValidationMiddleware(), authController.signup)
  .post(
    "/forgot-password",
    ValidationMiddleware(forgotPasswordDto),
    authController.forgotPassword
  )
  .post(
    "/reset-password/:token",
    ValidationMiddleware(resetPasswordDto),
    authController.resetPassword
  );

export default authRoutes;
