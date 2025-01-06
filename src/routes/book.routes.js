import { Router } from "express";
import {
    addBook,
    updateBook,
    deleteBook,
    getBooks
} from "../controllers/book.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/").post(verifyJWT,addBook);
router.route("/").get(verifyJWT,getBooks);

router
    .route("/:id")
    .put(verifyJWT,updateBook)
    .delete(verifyJWT,deleteBook);

export default router