import { Router } from "express";
import userController from "../controllers/user.controller.js";
import ValidationMiddleware from "../middleware/validation.middleware.js";
import { createUserSchema } from "../dtos/user-create.dto.js";

const userRoutes = Router();

userRoutes
  .post(
    "/add",
    ValidationMiddleware(createUserSchema),
    userController.createUser
  )
  .get("/", userController.getAllUsers);

export default userRoutes;
