import { Router } from "express";
import classController from "./class.controller.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { upload } from "../../utils/multer.utils.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { createClassDto } from "./dtos/class-create.dto.js";
import { updateClassDto } from "./dtos/class-update.dto.js";

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
    ValidationMiddleware(createClassDto),
    classController.createClass
  )
  .patch(
    "/update/:classId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin", "super-admin"),
    ValidationMiddleware(updateClassDto),
    classController.updateClass
  )
  .delete(
    "/delete/:classId",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin"),
    classController.deleteClass
  );

export default classRouter;
