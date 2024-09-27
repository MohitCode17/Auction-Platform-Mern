import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import Auction from "../models/auction.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Bid from "../models/bid.model.js";

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
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString(),
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

// GET AUCTION DETAILS BY ID
export const handleGetAuctionDetails = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    // VALIDATE THE ID
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new ErrorHandler("Invalid id format.", 400));

    // FIND THE AUCTION DETAILS
    const auction = await Auction.findById(id);

    if (!auction) return next(new ErrorHandler("Auction not found.", 404));

    const bidders = auction.bids.sort((a, b) => b.amount - a.amount);

    res.status(200).json({
      success: true,
      auction,
      bidders,
    });
  }
);

// GET MY AUCTIONS AUCTION
export const handleGetMyAuctions = catchAsyncErrors(async (req, res, next) => {
  const myAuctions = await Auction.find({ createdBy: req.user._id });

  res.status(200).json({
    success: true,
    myAuctions,
  });
});

// REMOVE AUCTION CONTROLLER
export const handleRemoveAuction = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // VALIDATE THE ID
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorHandler("Invalid id format.", 400));

  const auctionItem = await Auction.findById(id);

  if (!auctionItem) return next(new ErrorHandler("Auction not found.", 404));

  // DELETE AUCTION ITEM IMAGE
  if (auctionItem) {
    await cloudinary.uploader.destroy(auctionItem?.image?.public_id);
  }

  // DELETE AUCTION
  await auctionItem.deleteOne();

  res.status(200).json({
    success: true,
    message: "Auction deleted successfully.",
  });
});

// RE-PUBLISH AUCTION CONTROLLER
export const handleRepublishAuction = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    // VALIDATE THE ID
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new ErrorHandler("Invalid id format.", 400));

    let auctionItem = await Auction.findById(id);

    if (!auctionItem) return next(new ErrorHandler("Auction not found.", 404));

    // GET STARTING TIME AND ENDING TIME OF AUCTION
    if (!req.body.startTime || !req.body.endTime)
      return next(
        new ErrorHandler(
          "Start and end time for republish auction is required.",
          400
        )
      );

    // VALIDATE DATE
    if (new Date(auctionItem.endTime) > Date.now())
      return next(
        new ErrorHandler("Auction is already active, cannot republish.", 400)
      );

    // CREATE DATA OBJECT
    let data = {
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
    };

    if (data.startTime < Date.now())
      return next(
        new ErrorHandler(
          "Auction start time must be greater than present time."
        )
      );

    if (data.startTime >= data.endTime)
      return next(
        new ErrorHandler("Auction starting time must be less than ending time.")
      );

    if (auctionItem.highestBidder) {
      const highestBidder = await User.findById(auctionItem.highestBidder);
      highestBidder.moneySpent -= auctionItem.currentBid;
      highestBidder.auctionsWon -= 1;
      highestBidder.save();
    }

    // BIDS WILL BE AT INITIAL STATE, WHEN REPUBLISH THE AUCTION
    data.bids = [];

    data.commissionCalculated = false;
    data.currentBid = 0;
    data.highestBidder = null;

    auctionItem = await Auction.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    await Bid.deleteMany({ auctionItem: auctionItem._id });

    // UNPAID COMMISION SHOULD BE 0, WHEN REPUBLISH AUCTION
    const createdBy = await User.findByIdAndUpdate(
      req.user._id,
      { unpaidCommision: 0 },
      {
        new: true,
        runValidators: false,
      }
    );

    res.status(200).json({
      success: true,
      auctionItem,
      message: `Auction re-published and will be active on ${req.body.startTime}`,
    });
  }
);
