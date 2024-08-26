import { Router } from "express";
import groupController from "./group.controller.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

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
    groupController.createGroup
  )
  .patch(
    "/update/:groupId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    groupController.updateGroup
  )
  .delete(
    "/delete/:groupId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    groupController.deleteGroup
  );

export default groupRouter;
