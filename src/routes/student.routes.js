import { Router } from "express";
import { getAllStudents, getSingleStudent } from "../controllers/student.controller.js";

const studentRoutes = Router()

studentRoutes.get("/", getAllStudents)
.get("/:studentId", getSingleStudent)

export default studentRoutes