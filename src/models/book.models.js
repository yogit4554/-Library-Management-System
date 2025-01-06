import mongoose,{Schema} from "mongoose"

const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publicationYear:{
        type:Number,
        required:true
    },
    availabilityStatus:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
});

export const Book=mongoose.model("Book",bookSchema);