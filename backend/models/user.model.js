import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [3, "Username must contain at least 3 characters."],
      maxLength: [20, "Username cannot exceed 40 characters."],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      selected: false,
      minLength: [8, "Password must contain at least 8 characters."],
    },
    address: String,
    phone: {
      type: String,
      minLength: [10, "Phone number must be exactly 10 digits."],
      maxLength: [10, "Phone number must be exactly 10 digits."],
    },
    profilePicture: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber: String,
        bankAccountName: String,
        bankName: String,
        ifscCode: String,
      },
      paypal: {
        paypalId: String,
      },
      upiId: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["Auctioneer", "Bidder", "Super Admin"],
    },
    unpaidCommision: {
      type: Number,
      default: 0,
    },
    auctionsWon: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// HASH PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// GENERATE TOKEN
userSchema.methods.generateJwtToken = async function () {
  return jwt.sign({ userId: this._id }, config.JWT_SECRET_KEY, {
    expiresIn: config.TOKEN_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
