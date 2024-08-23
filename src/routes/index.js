import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import fieldRouter from "./field.routes.js";
import classRouter from "./class.routes.js";
import groupRouter from "./group.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/fields", fieldRouter);
routes.use("/classes", classRouter);
routes.use("/groups", groupRouter);

export default routes;
