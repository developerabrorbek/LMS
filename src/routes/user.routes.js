import { Router } from "express";
import userController from "../controllers/user.controller.js";
import ValidationMiddleware from "../middleware/validation.middleware.js";
import { createUserSchema } from "../dtos/user-create.dto.js";
import { updateUserSchema } from "../dtos/user-update.dto.js";

const userRoutes = Router();

userRoutes
  .post(
    "/add",
    ValidationMiddleware(createUserSchema),
    userController.createUser
  )
  .get("/", userController.getAllUsers)
  .patch("/update/:userId", ValidationMiddleware(updateUserSchema) ,userController.updateUser)
  .delete("/delete/:userId", userController.deleteUser);

export default userRoutes;
