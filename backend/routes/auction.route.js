import express from "express";
import {
  handleAddNewAuction,
  handleGetAuctionDetails,
  handleGetMyAuctions,
  handleRemoveAuction,
  handleRepublishAuction,
  handlGetAuctions,
} from "../controllers/auction.controller.js";
import { authenticate, isAuthorized } from "../middlewares/authenticate.js";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";

const router = express.Router();

// CREATE NEW AUCTION ROUTE
router.post(
  "/create",
  authenticate,
  isAuthorized("Auctioneer"),
  trackCommissionStatus,
  handleAddNewAuction
);

// GET ALL AUCTIONS ROUTE
router.get("/allAuctions", handlGetAuctions);

// GET AUCTION DETAILS ROUTE
router.get("/detail/:id", authenticate, handleGetAuctionDetails);

// GET MY AUCTION ROUTE
router.get(
  "/myAuction",
  authenticate,
  isAuthorized("Auctioneer"),
  handleGetMyAuctions
);

// DELETE AUCTION ROUTE
router.delete(
  "/delete/:id",
  authenticate,
  isAuthorized("Auctioneer"),
  handleRemoveAuction
);

// REPUBLISH AUCTION ROUTE
router.put(
  "/republish/:id",
  authenticate,
  isAuthorized("Auctioneer"),
  handleRepublishAuction
);

export default router;
