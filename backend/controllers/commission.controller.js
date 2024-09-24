import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import PaymentProof from "../models/commissionProof.model.js";

export const handleCommissionProof = catchAsyncErrors(
  async (req, res, next) => {
    // THROW ERROR IF NO COMMISSION PROOF IMAGE RECEIVED
    if (!req.files || Object.keys(req.files).length === 0)
      return next(new ErrorHandler("Payment proof image is required.", 400));

    // GET PAYMENT PROOF IMAGE
    const { proof } = req.files;

    // CHECK MIMETYPE
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(proof.mimetype))
      return next(new ErrorHandler("File format is not supported.", 400));

    const { amount, comment } = req.body;

    if (!amount || !comment)
      return next(new ErrorHandler("Amount & comment are required.", 400));

    const user = await User.findById(req.user._id);

    // CHECK UNPAIDCOMMISSION
    if (user.unpaidCommision === 0)
      return res.status(200).json({
        success: true,
        message: "You don't have any unpaid commission.",
      });

    if (user.unpaidCommision < amount)
      return next(
        new ErrorHandler(
          `The amount exceeds your unpaid commission balance. Please enter an amount up to ${user.unpaidCommision}`,
          403
        )
      );

    // UPLOAD PROOF TO CLOUDINARY
    const cloudinaryResponse = await cloudinary.uploader.upload(
      proof.tempFilePath,
      {
        folder: "Auction platform payment proof",
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error: ",
        cloudinaryResponse.error || "Unknown cloudinary error."
      );

      return next(new ErrorHandler("Failed to upload payment proof.", 500));
    }

    const commissionProof = await PaymentProof.create({
      userId: req.user._id,
      proof: {
        public_id: cloudinaryResponse?.public_id,
        url: cloudinaryResponse?.secure_url,
      },
      amount,
      comment,
    });

    res.status(201).json({
      success: true,
      message:
        "Your proof has been submitted successfully. We will review it and responed to you within 24 hours.",
      commissionProof,
    });
  }
);
