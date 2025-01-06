import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new ApiError(401, "No token, authorization denied");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = decodedToken; // Attach the decoded token to the request object
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});

export const adminMiddleware = asyncHandler(async (req, res, next) => {
  try {
    // Fetch user details from the database using the id from the decoded token
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.role !== "admin") {
      throw new ApiError(403, "Access denied, admin only");
    }

    req.user = user; // Attach the full user details to the request object
    next();
  } catch (error) {
    throw new ApiError(403, error?.message || "Access denied, admin only");
  }
});