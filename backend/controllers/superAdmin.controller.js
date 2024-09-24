import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.model.js";
import Commission from "../models/commission.model.js";
import PaymentProof from "../models/commissionProof.model.js";
import mongoose from "mongoose";
import Auction from "../models/auction.model.js";
import cloudinary from "../config/cloudinary.js";

// DELETE AUCTION CONTROLLER (SUPER-ADMIN)
export const handleDeleteAuctionItem = catchAsyncErrors(
  async (req, res, next) => {
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
  }
);

// GET ALL PAYMENT PROOF(SUPER-ADMIN)
export const handleGetPaymentProof = catchAsyncErrors(
  async (req, res, next) => {
    const paymentProofs = await PaymentProof.find();

    res.status(200).json({
      success: true,
      paymentProofs,
    });
  }
);

// GET PAYMENT PROOF DETAILS(SUPER-ADMIN)
export const handleGetPaymentProofDetail = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const paymentProofDetail = await PaymentProof.findById(id);

    res.status(200).json({
      success: true,
      paymentProofDetail,
    });
  }
);

// UPDATE PAYMENT PROOF (SUPER-ADMIN)
export const handleUpdatePaymentProof = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const { amount, status } = req.body;

    // VALIDATE THE ID
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new ErrorHandler("Invalid id format.", 400));

    let proof = await PaymentProof.findById(id);
    if (!proof) return next(new ErrorHandler("Payment proof not found.", 404));

    proof = await PaymentProof.findByIdAndUpdate(
      id,
      { amount, status },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment proof amount and status updated.",
      proof,
    });
  }
);

// DELETE PAYMENT PROOF (SUPER ADMIN)
export const handleDeletePaymentProof = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const proof = await PaymentProof.findById(id);

    if (!proof) return next(new ErrorHandler("Payment proof not found.", 404));

    // DELETE AUCTION ITEM IMAGE
    if (proof) {
      await cloudinary.uploader.destroy(proof?.proof?.public_id);
    }

    // DELETE PROOF
    await proof.deleteOne();
    res.status(200).json({
      success: true,
      message: "Payment proof deleted.",
    });
  }
);
