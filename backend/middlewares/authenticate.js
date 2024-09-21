import { config } from "../config/config.js";
import User from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const authenticate = catchAsyncErrors(async (req, res, next) => {
  // GET TOKEN FROM COOKIE
  const token = req.cookies.token;

  // ERROR IF TOKEN NOT FOUND
  if (!token) return next(new ErrorHandler("User not authenticated", 401));

  // VERIFY TOKEN
  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.userId);
  next();
});
