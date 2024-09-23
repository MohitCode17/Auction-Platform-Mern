import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import Auction from "../models/auction.model.js";
import Bid from "../models/bid.model.js";
import User from "../models/user.model.js";

// PLACE A BID TO AN AUCTION CONTROLLER
export const handlePlaceBid = catchAsyncErrors(async (req, res, next) => {
  // GETTING ID OF AN AUCTION
  const { id } = req.params;

  const auction = await Auction.findById(id);

  if (!auction) return next(new ErrorHandler("Auction not found.", 404));

  // GETTING BID AMOUNT
  const { amount } = req.body;

  if (!amount)
    return next(new ErrorHandler("Amount is required for placing a bid.", 400));

  // CHECK IF AMOUNT IS LESS THAN OR EQUAL TO THE CURRENT AUCTION AMOUNT
  // INITIAL BID AMOUNT --> 30000
  // PERSON A: BID AMOUNT --> 31000 ✅ (CURRENT BID)
  // PERSON B: BID AMOUNT --> 30500 ❌
  if (amount <= auction.currentBid)
    return next(
      new ErrorHandler(
        "Bid amount must be greater than the current bid amount.",
        400
      )
    );

  // CHECK IF AMOUNT IS MORE THAN THE AUCTION AMOUNT
  // INITIAL BID AMOUNT --> 30000
  // PERSON A: BID AMOUNT --> 31000 ✅
  // PERSON A: BID AMOUNT --> 29500 ❌
  if (amount < auction.startingBid)
    return next(
      new ErrorHandler(
        "Bid amount must be greater than the starting bid amount.",
        400
      )
    );

  try {
    // FIND THE EXISTING BID
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auction._id,
    });

    const existingBidInAuction = auction.bids.find(
      (bid) => bid.userId.toString() == req.user._id.toString()
    );

    if (existingBid && existingBidInAuction) {
      existingBidInAuction.amount = amount;
      existingBid.amount = amount;
      await existingBidInAuction.save();
      await existingBid.save();

      auction.currentBid = amount;
    } else {
      const bidderDetails = await User.findById(req.user._id);
      await Bid.create({
        amount,
        bidder: {
          id: bidderDetails._id,
          username: bidderDetails.username,
          profileImage: bidderDetails.profilePicture?.url,
        },
        auctionItem: auction._id,
      });

      auction.bids.push({
        userId: req.user._id,
        username: bidderDetails.username,
        profilePicture: bidderDetails.profilePicture?.url,
        amount,
      });
      auction.currentBid = amount;
    }

    await auction.save();

    res.status(201).json({
      success: true,
      message: "Bid Placed.",
      currentBid: auction.currentBid,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to place bid.", 500));
  }
});
