import { Router } from "express";
import classController from "./class.controller.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";

const classRouter = Router();

classRouter
  .get("/", classController.getAllClasses)
  .post("/add", CheckAuthGuard(true), classController.createClass)
  .patch("/update/:classId", CheckAuthGuard(true), classController.updateClass)
  .delete(
    "/delete/:classId",
    CheckAuthGuard(true),
    classController.deleteClass
  );

export default classRouter;
