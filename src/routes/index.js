import { Router } from "express";
import studentRoutes from "./student.routes.js";
import authRoutes from "./auth.routes.js";

const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/auth", authRoutes);

export default routes;
