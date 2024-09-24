import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    amount: Number,
    user: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Commission = mongoose.model("Commission", commissionSchema);

export default Commission;
