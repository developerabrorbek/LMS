import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import fieldRouter from "../modules/field/field.routes.js";
import classRouter from "../modules/class/class.routes.js";
import groupRouter from "../modules/group/group.routes.js";
import lessonRouter from "../modules/lesson/lesson.routes.js";
import lessonVideoRouter from "../modules/lesson-video/lesson-video.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/fields", fieldRouter);
routes.use("/classes", classRouter);
routes.use("/groups", groupRouter);
routes.use("/lessons", lessonRouter);
routes.use("/lesson-videos", lessonVideoRouter);

export default routes;
