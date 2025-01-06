import {Transaction} from "../models/transaction.model.js"
import {Book} from "../models/book.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const borrowBook = asyncHandler(async(req,res)=>{
    const { bookId, userId } = req.body;
    try {
        const book = await Book.findById(bookId);

        if(!book || !book.availabilityStatus){
            throw new ApiError(400,error?.message || "eror while checking status!!");
        }
        const transaction = new Transaction({ bookId, userId });
        await transaction.save();

        book.availabilityStatus = false;
        await book.save();

        return res.status(200).json(
            new ApiResponse(200,transaction,"Transaction Created Successfully!")
        )

    } catch (error) {
        throw new ApiError(400,"Error while creating book");
    }
});

const returnBook = asyncHandler(async(req,res)=>{
    const { bookId, userId } = req.body;
    try {
        const transaction = await Transaction.findOne({ bookId, userId, returnDate: null });
        if (!transaction) {
            throw new ApiError(400,"Transaction not found or book already returned");
        }

        transaction.returnDate = new Date();
        await transaction.save();

        const book = await Book.findById(bookId);
        book.availabilityStatus = true;
        await book.save();

        return res.status(200).json(
            new ApiResponse(200,transaction,"Returned Successfully!!")
        )
    } catch (error) {
        throw new ApiError(400,"Error while returning book");
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