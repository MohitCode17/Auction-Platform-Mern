import express from "express";
import { handleAddNewAuction } from "../controllers/auction.controller.js";
import { authenticate, isAuthorized } from "../middlewares/authenticate.js";

const router = express.Router();

// CREATE NEW AUCTION ROUTE
router.post(
  "/create",
  authenticate,
  isAuthorized("Auctioneer"),
  handleAddNewAuction
);

export default router;
