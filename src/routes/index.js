import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import fieldRouter from "./field.routes.js";
import classRouter from "./class.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/fields", fieldRouter);
routes.use("/classes", classRouter);

export default routes;
