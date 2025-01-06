import {Book} from "../models/book.models.js"
import {Transaction} from "../models/transaction.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const getDashboardStats = asyncHandler(async(req,res)=>{
    try {
        const totalBooks = await Book.countDocuments();
        const borrowedBooks = await Transaction.countDocuments({ returnDate: null });
        const availableBooks = totalBooks - borrowedBooks;

        res.status(200).json({ totalBooks, borrowedBooks, availableBooks });
    } catch (error) {
        throw new ApiError(401, "Something went wrong while getting dashboard");
    }
});

export {
    getDashboardStats
}