import { Router } from "express";
import {
    getDashboardStats
} from "../controllers/dashboard.controller.js"
import { authMiddleware , adminMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/").get(authMiddleware , adminMiddleware,getDashboardStats);

export default router