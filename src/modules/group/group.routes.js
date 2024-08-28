import { Router } from "express";
import groupController from "./group.controller.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { groupCreateSchema } from "./dtos/group-create.dto.js";
import { groupUpdateSchema } from "./dtos/group-update.dto.js";

const groupRouter = Router();

groupRouter
  .get(
    "/",
    CheckAuthGuard(false),
    CheckRolesGuard(),
    groupController.getAllGroups
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    ValidationMiddleware(groupCreateSchema),
    groupController.createGroup
  )
  .patch(
    "/update/:groupId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    ValidationMiddleware(groupUpdateSchema),
    groupController.updateGroup
  )
  .delete(
    "/delete/:groupId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    groupController.deleteGroup
  );

export default groupRouter;
