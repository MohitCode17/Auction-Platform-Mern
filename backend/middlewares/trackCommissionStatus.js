import User from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const trackCommissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user_id);

    if (user?.unpaidCommision > 0) {
      return next(
        new ErrorHandler(
          "You have an unpaid commission. Please pay them before posting a new auction."
        )
      );
    }
    next();
  }
);
