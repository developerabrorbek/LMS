import { Router } from "express";
import classController from "./class.controller.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

const classRouter = Router();

classRouter
  .get(
    "/",
    CheckAuthGuard(false),
    CheckRolesGuard(),
    classController.getAllClasses
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin", "super-admin"),
    classController.createClass
  )
  .patch(
    "/update/:classId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin", "super-admin"),
    classController.updateClass
  )
  .delete(
    "/delete/:classId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin"),
    classController.deleteClass
  );

export default classRouter;
