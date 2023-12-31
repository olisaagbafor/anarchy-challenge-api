import crypto from "crypto";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//@description: Register User
//@return:  User Object & JSON Web Token
//@route:   POST /api/v1/auth/register
//@access:  Public
export const register = asyncHandler(async (req, res, next) => {
  const { display_name, email, password } = req.body;

  const user = await UserModel.create({
    display_name,
    email,
    password,
  });

  if (!user) {
    return next(new ErrorResponse("Unable to Register user, try again!", 500));
  }

  sendTokenResponse(user, 200, res);
});

//@description: Login User
//@return:  JSON Web Token
//@route:   POST /api/v1/auth/login
//@access:  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide your email and password`, 400));
  }

  // Check User
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }

  // Match password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }

  sendTokenResponse(user, 200, res);
});

//@description: Logout User
//@return:  empty object
//@route:   GET /api/v1/auth/logout
//@access:  Public
export const logout = asyncHandler(async (req, res, next) => {
  req.session.destroy();
  res.cookie("token", "none", { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.status(200).json({ success: true, data: {} });
});

//@description: Get current logged in user
//@return:  User data
//@route:   POST /api/v1/auth/me
//@access:  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  res.status(200).json({ success: true, data: user });
});

//@description: Update current logged in user details
//@return:  User data
//@route:   PUT /api/v1/auth/me/update-details
//@access:  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    display_name: req.body.display_name,
  };
  const user = await UserModel.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// Get Token from Model, create cookie and send response
export const sendTokenResponse = (user, statusCode, res) => {
  // Create Token
  const token = user.getSignedJWT();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // Set Secure option if in production environment
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({ success: true, data: { user, token } });
};
