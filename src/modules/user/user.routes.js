import { Router } from "express";
import userController from "./user.controller.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { createUserSchema } from "./dtos/user-create.dto.js";
import { updateUserSchema } from "./dtos/user-update.dto.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

const userRoutes = Router();

userRoutes
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    ValidationMiddleware(createUserSchema),
    userController.createUser
  )
  .get(
    "/",
    CheckAuthGuard(false),
    CheckRolesGuard(),
    userController.getAllUsers
  )
  .patch(
    "/update/:userId",
    CheckAuthGuard(true),
    CheckRolesGuard(),
    ValidationMiddleware(updateUserSchema),
    userController.updateUser
  )
  .delete(
    "/delete/:userId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    userController.deleteUser
  );

export default userRoutes;
