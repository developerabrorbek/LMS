import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import ValidationMiddleware from "../middleware/validation.middleware.js";
import { loginSchema } from "../dtos/login.dto.js";

const authRoutes = Router();

authRoutes.post("/login", ValidationMiddleware(loginSchema),  authController.signin)
.post("/register", ValidationMiddleware(), authController.signup);

export default authRoutes;
