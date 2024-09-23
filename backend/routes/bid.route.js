import express from "express";
import { authenticate, isAuthorized } from "../middlewares/authenticate.js";
import { handlePlaceBid } from "../controllers/bid.controller.js";
import { checkAuctionTime } from "../middlewares/checkAuctionTime.js";

const router = express.Router();

// PLACE A BID ROUTE
router.post(
  "/place/:id",
  authenticate,
  isAuthorized("Bidder"),
  checkAuctionTime,
  handlePlaceBid
);

export default router;
