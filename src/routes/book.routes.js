import { Router } from "express";
import {
    addBook,
    updateBook,
    deleteBook,
    getBooks,
    getBooksByAvailability
} from "../controllers/book.controller.js"
import { authMiddleware , adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/addBook").post(authMiddleware,adminMiddleware,addBook); // admin 
router.route("/getBooks").get(authMiddleware,getBooks); // all user
router.route("/availability").get(authMiddleware,getBooksByAvailability); // all user

router
    .route("/:id")
    .put(authMiddleware,adminMiddleware,updateBook)  // admin
    .delete(authMiddleware,adminMiddleware,deleteBook); //admin

export default router