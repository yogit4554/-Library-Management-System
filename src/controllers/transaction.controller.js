import {Transaction} from "../models/transaction.model.js"
import {Book} from "../models/book.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const borrowBook = asyncHandler(async (req, res) => {
    const { bookId, returnDate } = req.body;
    const userId = req.user?.id; // Use the logged-in user's ID from req.user

    if (!userId) {
        throw new ApiError(401, "User not authenticated!");
    }

    try {
        const book = await Book.findById(bookId);

        if (!book || !book.availabilityStatus) {
            throw new ApiError(400, "Book is either not found or not available!");
        }

        // Log book details for debugging
        console.log(book);

        // Create a transaction
        const transaction = new Transaction({ bookId, userId, returnDate });
        await transaction.save();

        console.log(transaction);

        // Update the book's availability status
        book.availabilityStatus = false;
        await book.save();

        // Return success response
        return res.status(200).json(
            new ApiResponse(200, transaction, "Transaction Created Successfully!")
        );
    } catch (error) {
        throw new ApiError(400, error.message || "Error while creating borrow transaction");
    }
});

const returnBook = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user?.id; // Use the logged-in user's ID from req.user

    if (!userId) {
        throw new ApiError(401, "User not authenticated!");
    }

    try {
        // Find the transaction for the given book and user
        const transaction = await Transaction.findOne({ bookId, userId });



        if (!transaction) {
            throw new ApiError(400, "Transaction not found or book already returned!");
        }

        // Update the return date
        transaction.returnDate = new Date();
        await transaction.save();

        // Update the book's availability status
        const book = await Book.findById(bookId);

        if (!book) {
            throw new ApiError(404, "Book not found!");
        }

        book.availabilityStatus = true;
        await book.save();

        // Return success response
        return res.status(200).json(
            new ApiResponse(200, transaction, "Book returned successfully!")
        );
    } catch (error) {
        throw new ApiError(400, error.message || "Error while returning book");
    }
});
// Get all transactions
const getAllTransactions  = asyncHandler(async(req,res)=>{
    try {
        const transactions = await Transaction.find().populate('bookId userId');
        

        return res.status(200).json(
            new ApiResponse(200,transactions,"Transactions Fetched  Successfully!!")
        )


    } catch (error) {
        throw new ApiError(400,"EErroe while fetching !!")
    }
});
// Get transactions for a specific user
const getTransactionsByUser  = asyncHandler(async(req,res)=>{
    try {
        const transactions = await Transaction.find({ userId: req.params.userId }).populate('bookId');
        if(!transactions){
            throw new ApiError(400,"Erroe while fetching !!")
        }
        
        return res
        .status(200)
        .json(new ApiResponse(200,transactions,"Transaction fetched Successfully"))
    } catch (error) {
        throw new ApiError(400,error?.message || "Erroe while fetching !!");
    }
});

export {
    borrowBook,
    returnBook,
    getAllTransactions,
    getTransactionsByUser
}