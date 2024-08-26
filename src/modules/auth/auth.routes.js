import { Router } from "express";
import authController from "./auth.controller.js";
import { loginSchema } from "./dtos/login.dto.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";

const authRoutes = Router();

authRoutes
  .post("/login", ValidationMiddleware(loginSchema), authController.signin)
  .post("/register", ValidationMiddleware(), authController.signup);

export default authRoutes;
