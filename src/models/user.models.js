import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
      type:String,
      enum:['admin','user'],
      default:'user'  
    }
},{
    timestamps:true
});



userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,12)
    next()
})

userSchema.methods.matchPassword =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export const User=mongoose.model("User",userSchema);