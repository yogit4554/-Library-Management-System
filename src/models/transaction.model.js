import mongoose,{Schema} from "mongoose"

const transactionSchema = new Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    borrowDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    returnDate:{
        type:Date,
        default:true
    }
},{
    timestamps:true
});

export const Transaction=mongoose.model("Transaction",transactionSchema);