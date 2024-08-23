import { Router } from "express";
import classController from "../controllers/class.controller.js";

const classRouter = Router();

classRouter
  .get("/", classController.getAllClasses)
  .post("/add", classController.createClass)
  .patch("/update/:classId", classController.updateClass)
  .delete("/delete/:classId", classController.deleteClass);

export default classRouter;
