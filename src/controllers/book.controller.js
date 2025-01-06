import {Book} from "../models/book.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const addBook = asyncHandler(async(req,res)=>{
    try {
        const createdbook = new Book(req.body);
        if(!createdbook){
            throw new ApiError(400,error?.message || "eror while creating new book");
        }
        return res.status(201).json(
            new ApiResponse(200,createdbook,"User Registered Succesfully")
        ) 

    } catch (error) {
        throw new ApiError(400,"Error while creating book");
    }
});

const getBooks = asyncHandler(async(req,res)=>{
    try {
        const books = await Book.find();
        if(!books){
            throw new ApiError(400,error?.message || "Error while fetching books!!");
        }

        return res.status(200).json(
            new ApiResponse(200,books,"Books fetched Successfully!!")
        )
    } catch (error) {
        throw new ApiError(400,"Error while fetching book");
    }
});

const updateBook = asyncHandler(async(req,res)=>{
    const {id} =req.params;
    const {title,author,publicationYear,availabilityStatus} = req.body;
    try {
        const book = await Book.findByIdAndUpdate(
            id,
            {title,author,publicationYear,availabilityStatus},
            {new:true}
        );

        if(!book){
            throw new ApiError(400,"Error while upadting books!!")
        }

        return res.status(200).json(
            new ApiResponse(200,book,"Books Updated Successfully!!")
        )


    } catch (error) {
        throw new ApiError(400,"Error while upadting books!!")
    }
});

const deleteBook = asyncHandler(async(req,res)=>{
    try {
        const Book = await Book.findById(id);
        if(!user){
            throw new ApiError(400,"Book not found")
        }
        await Book.findByIdAndDelete(id);
        return res
        .status(200)
        .json(new ApiResponse(200,null,"Book deleted Successfully"))
    } catch (error) {
        throw new ApiError(400,error?.message || "Error while deleting user!!");
    }
});

export {
    addBook,
    getBooks,
    updateBook,
    deleteBook
}