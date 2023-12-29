import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import UserModel from "../models/UserModel.js";

// Protect routes
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Set token from header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } // Set token from cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this page!!!.", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this page!", 401));
  }
});

// Grant Access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user.roles.some((role) => roles.includes(role))) {
      return next(new ErrorResponse(`You are not allowed to perform this action!`, 403));
    }
    next();
  };
};
