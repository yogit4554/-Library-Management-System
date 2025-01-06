import {Book} from "../models/book.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"

const addBook = asyncHandler(async(req,res)=>{
    console.log(req.body);

    try {
        const createdbook = new Book(req.body);
        const savedBook = await createdbook.save();
        if(!createdbook){
            throw new ApiError(400,error?.message || "eror while creating new book");
        }

        return res.status(201).json(
            new ApiResponse(200,savedBook,"Book Registered Succesfully")
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
        console.log(books);

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
    const {id}=req.params;
    try {
        const deletingBook = await Book.findById(id);
        if(!deletingBook){
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

const getBooksByAvailability = asyncHandler(async(req,res)=>{
    try {
        const books = await Book.find({ availabilityStatus: req.query.available === 'true' });
        return res
        .status(200)
        .json(new ApiResponse(200,books,"Books Status checked!!"))
    } catch (error) {
        throw new ApiError(400,"Error while checking availability");
    }
});

export {
    addBook,
    getBooks,
    updateBook,
    deleteBook,
    getBooksByAvailability
}