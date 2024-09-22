import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import Auction from "../models/auction.model.js";
import cloudinary from "../config/cloudinary.js";

// CREATE NEW AUCTION CONTROLLER
export const handleAddNewAuction = catchAsyncErrors(async (req, res, next) => {
  // THROW ERROR IF NO AUCTION IMAGE RECEIVED
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Auction image is required.", 400));

  // GET PROFILE
  const { image } = req.files;

  // CHECK MIMETYPE
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(image.mimetype))
    return next(new ErrorHandler("File format is not supported.", 400));

  // GETTING AUCTION DETAILS
  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;

  // VALIDATE AUCTION REQUIRED DETAILS
  if (
    !title ||
    !description ||
    !category ||
    !condition ||
    !startingBid ||
    !startTime ||
    !endTime
  )
    return next(new ErrorHandler("Please provide all details", 400));

  // VALIDATING AUCTION TIME CONSTRAINTS
  if (new Date(startTime) < Date.now())
    return next(
      new ErrorHandler("Auction start time must be greater than present time.")
    );

  if (new Date(startTime) >= new Date(endTime))
    return next(
      new ErrorHandler("Auction starting time must be less than ending time.")
    );

  // CHECK IF ANY AUCTION IS ACTIVE
  // IF END TIME IS GREATER THAN THE CURRENT TIME, THAT MEAN THERE IS ANY AUCTION WHICH END IN FUTURE.
  const alreadyActiveAuction = await Auction.find({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });

  if (alreadyActiveAuction.length > 0)
    return next(new ErrorHandler("You already have one active auction.", 400));

  // UPLOAD IMAGE TO CLOUDINARY
  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    {
      folder: "Auction platform items",
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponse.error || "Unknown cloudinary error."
    );

    return next(
      new ErrorHandler("Failed to upload auction image to cloudinary.", 500)
    );
  }

  const auctionItem = await Auction.create({
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
    image: {
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
    },
    createdBy: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: `Auction created and will be listed on auction page at ${startTime}.`,
    auctionItem,
  });
});

// GET ALL AUCTION CONTROLLER
export const handlGetAuctions = catchAsyncErrors(async (req, res, next) => {
  const auctions = await Auction.find();
  res.status(200).json({
    success: true,
    auctions,
  });
});
