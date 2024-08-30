import { Router } from "express";
import lessonVideoController from "./lesson-video.controller.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { lessonCreateDto } from "./dtos/lesson-create.dto.js";
import { lessonUpdateDto } from "./dtos/lesson-update.dto.js";
import { upload } from "../../utils/multer.utils.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

const lessonVideoRouter = Router();

lessonVideoRouter
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("teacher", "super-admin"),
    upload.single("video"),
    ValidationMiddleware(lessonCreateDto),
    lessonVideoController.createLessonVideo
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("student", "teacher", "admin", "super-admin"),
    lessonVideoController.getAllLessonVideo
  )
  .patch(
    "/update/:lessonVideoId",
    CheckAuthGuard(true),
    CheckRolesGuard("teacher", "super-admin"),
    ValidationMiddleware(lessonUpdateDto),
    lessonVideoController.updateLessonVideo
  )
  .delete(
    "/delete/:lessonVideoId",
    CheckAuthGuard(true),
    CheckRolesGuard("teacher", "super-admin"),
    lessonVideoController.deleteLessonVideo
  );

export default lessonVideoRouter;
