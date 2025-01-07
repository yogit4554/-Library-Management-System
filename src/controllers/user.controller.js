import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  };

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            const token = generateToken(admin._id);
            
            // Set token in cookies
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Only secure in production
                sameSite: "strict",
                maxAge: process.env.ACCESS_TOKEN_EXPIRY_MS,
            });

            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role:admin.role,
                token,
            });
        } else {
            throw new ApiError(401, "Invalid email or password");
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const registerUser = asyncHandler(async(req,res)=>{
    const { name, email, password , role } = req.body;
    
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            throw new ApiError(400,"Email already exists!!")
        }


        // Create new admin
        const user = new User({ name, email, password, role });
        await user.save();
        
        return res
        .status(201)
        .json(new ApiResponse(200,user,"new admin created!!"))

    } catch (error) {
        throw new ApiError(400,"Error while registerting the admin!!")
    }
})
export {
    loginUser,
    registerUser
}