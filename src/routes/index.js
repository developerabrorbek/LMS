import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import fieldRouter from "./field.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/fields", fieldRouter);

export default routes;
