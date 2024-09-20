import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

// REGISTER USER ROUTE
export const handleRegister = catchAsyncErrors(async (req, res, next) => {
  // THROW ERROR IF NO PROFILE IMAGE RECEIVED
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Profile image is required.", 400));

  // GET PROFILE
  const { profilePicture } = req.files;

  // CHECK MIMETYPE
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(profilePicture.mimetype))
    return next(new ErrorHandler("File format is not supported.", 400));

  // GETTING DATA
  const {
    username,
    email,
    password,
    address,
    phone,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    ifscCode,
    paypalId,
    upiId,
  } = req.body;

  if (!username || !email || !password || !phone || !role)
    return next(new ErrorHandler("Please provide the full details.", 400));

  if (role === "Auctioneer") {
    if (!bankAccountName || !bankAccountNumber || !bankName || !ifscCode)
      return next(new ErrorHandler("Please provide your bank details.", 400));

    if (!paypalId)
      return next(
        new ErrorHandler("Please provide the your paypal account id.", 400)
      );

    if (!upiId)
      return next(new ErrorHandler("Please provide the your upi id.", 400));
  }

  // CHECK IF USER ALREADY REGISTER
  let user = await User.findOne({ email });

  // THROW ERROR IF YES
  if (user) return next(new ErrorHandler("User already registered.", 400));

  // UPLOAD IMAGE TO CLOUDINARY
  const cloudinaryResponse = await cloudinary.uploader.upload(
    profilePicture.tempFilePath,
    {
      folder: "Auction platform users",
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponse.error || "Unknown cloudinary error."
    );

    return next(
      new ErrorHandler("Failed to upload profile image to cloudinary.", 500)
    );
  }

  // CREATE A USER
  user = await User.create({
    username,
    email,
    password,
    phone,
    address,
    role,
    profilePicture: {
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      paypal: {
        paypalId,
      },
      upiId: {
        upiId,
      },
    },
  });

  // 👉 TODO - GENERATE AUTH TOKEN AND SET TO COOKIE
});

// LOGIN USER CONTROLLER
export const handleLogin = catchAsyncErrors(async (req, res, next) => {
  // GETTING DATA
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please provide all details.", 400));

  // FIND USER
  const user = await User.findOne({ email });

  // THROW ERROR IF USER NOT REGISTER
  if (!user) return next(new ErrorHandler("Invalid credentials.", 400));

  // COMPARE PASSWORD
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid credentials.", 400));

  // 👉 TODO - GENERATE AUTH TOKEN AND SET TO COOKIE
});
