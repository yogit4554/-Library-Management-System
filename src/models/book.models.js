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
    }
},{
    timestamps:true
});

export const Book=mongoose.model("Book",bookSchema);