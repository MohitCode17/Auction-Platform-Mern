import express from "express";
import { authenticate, isAuthorized } from "../middlewares/authenticate.js";
import { handleCommissionProof } from "../controllers/commission.controller.js";

const router = express.Router();

// COMMISSION ROUTE
router.post(
  "/proof",
  authenticate,
  isAuthorized("Auctioneer"),
  handleCommissionProof
);

export default router;
