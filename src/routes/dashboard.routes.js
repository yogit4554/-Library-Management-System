import { Router } from "express";
import {
    getDashboardStats
} from "../controllers/dashboard.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/").get(verifyJWT,getDashboardStats);

export default router