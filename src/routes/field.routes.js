import { Router } from "express";
import fieldController from "../controllers/field.controller.js";

const fieldRouter = Router();

fieldRouter
  .get("/", fieldController.getAllFields)
  .post("/add", fieldController.createField)
  .patch("/update/:fieldId", fieldController.updateField)
  .delete("/delete/:fieldId", fieldController.deleteField);

export default fieldRouter;
