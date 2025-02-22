import {Book} from "../models/book.models.js"
import {Transaction} from "../models/transaction.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const getDashboardStats = asyncHandler(async(req,res)=>{
    try {
        const totalBooks = await Book.countDocuments();
        const borrowedBooksTillNow = await Transaction.countDocuments({ returnDate: null });
        const borrowedBooks = await Book.countDocuments({ availabilityStatus: false });
        const availableBooks = await Book.countDocuments({ availabilityStatus: true });

        res.status(200).json({ totalBooks, borrowedBooks, availableBooks });
    } catch (error) {
        throw new ApiError(401, "Something went wrong while getting dashboard");
    }
});

export {
    getDashboardStats
}