import { Router } from "express";
import groupController from "./group.controller.js";

const groupRouter = Router();

groupRouter
  .get("/", groupController.getAllGroups)
  .post("/add", groupController.createGroup)
  .patch("/update/:groupId", groupController.updateGroup)
  .delete("/delete/:groupId", groupController.deleteGroup);

export default groupRouter;
