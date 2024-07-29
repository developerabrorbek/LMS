import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const authRoutes = Router()

authRoutes.post("/sign-in", login)

export default authRoutes