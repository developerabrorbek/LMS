import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import { VerifyJwtTokenMiddleware } from "../middleware/jwt-verify.middleware.js";

const routes = Router();

routes.use("/users",VerifyJwtTokenMiddleware(), userRoutes);
routes.use("/auth", authRoutes);

export default routes;
