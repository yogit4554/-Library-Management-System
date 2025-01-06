import { Router } from "express";
import {
    borrowBook,
    returnBook,
    getAllTransactions,
    getTransactionsByUser
} from "../controllers/transaction.controller.js"
import { authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/borrow").post(authMiddleware,borrowBook);
router.route("/return").post(authMiddleware,returnBook);
router.route("/").get(authMiddleware,getAllTransactions);
router.route("/user/:userId").get(authMiddleware,getTransactionsByUser);

export default router