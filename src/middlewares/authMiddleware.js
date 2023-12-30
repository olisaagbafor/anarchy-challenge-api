import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import UserModel from "../models/UserModel.js";

// Protect routes
export const authenticate = asyncHandler(async (req, res, next) => {
  req.user ? next() : next(new ErrorResponse("Session Expired!", 401));
  // req.user ? next() : res.status(401).redirect(`${process.env.CLIENT_DOMAIN}/auth/login`);
});
