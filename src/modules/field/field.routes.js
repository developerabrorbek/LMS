import { Router } from "express";
import fieldController from "./field.controller.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";

const fieldRouter = Router();

fieldRouter
  .get(
    "/",
    CheckAuthGuard(false),
    CheckRolesGuard(),
    fieldController.getAllFields
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin"),
    fieldController.createField
  )
  .patch(
    "/update/:fieldId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    fieldController.updateField
  )
  .delete(
    "/delete/:fieldId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin"),
    fieldController.deleteField
  );

export default fieldRouter;
