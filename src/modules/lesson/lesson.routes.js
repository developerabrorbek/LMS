import { Router } from "express";
import lessonController from "./lesson.controller.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { createLessonDto } from "./dtos/create-lesson.dto.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { updateLessonDto } from "./dtos/update-lesson.dto.js";

const lessonRouter = Router();

lessonRouter
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("teacher", "admin", "super-admin"),
    ValidationMiddleware(createLessonDto),
    lessonController.createLesson
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard(),
    lessonController.getAllLessons
  )
  .patch(
    "/update/:lessonId",
    CheckAuthGuard(true),
    CheckRolesGuard("teacher", "admin", "super-admin"),
    ValidationMiddleware(updateLessonDto),
    lessonController.updateLesson
  )
  .delete(
    "/delete/:lessonId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin", "super-admin"),
    lessonController.deleteLesson
  );

export default lessonRouter;
