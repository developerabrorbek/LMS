import { Router } from "express";
import userController from "./user.controller.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { createUserSchema } from "./dtos/user-create.dto.js";
import { updateUserSchema } from "./dtos/user-update.dto.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";

const userRoutes = Router();

userRoutes
  .post(
    "/add",
    ValidationMiddleware(createUserSchema),
    userController.createUser
  )
  .get("/", CheckAuthGuard(true) ,userController.getAllUsers)
  .patch(
    "/update/:userId",
    ValidationMiddleware(updateUserSchema),
    userController.updateUser
  )
  .delete("/delete/:userId", userController.deleteUser);

export default userRoutes;
