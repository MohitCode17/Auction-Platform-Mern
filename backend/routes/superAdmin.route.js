import express from "express";
import { authenticate, isAuthorized } from "../middlewares/authenticate.js";
import {
  handleDeleteAuctionItem,
  handleDeletePaymentProof,
  handleFetchAllUsers,
  handleGetPaymentProof,
  handleGetPaymentProofDetail,
  handleUpdatePaymentProof,
} from "../controllers/superAdmin.controller.js";
const router = express.Router();

// DELETE AUCTION ITEM (SUPER-ADMIN ROUTE)
router.delete(
  "/auction/delete/:id",
  authenticate,
  isAuthorized("Super Admin"),
  handleDeleteAuctionItem
);

// GET PAYMENT PROOF (SUPER ADMIN ROUTE)
router.get(
  "/paymentproofs/getAll",
  authenticate,
  isAuthorized("Super Admin"),
  handleGetPaymentProof
);

// GET PAYMENT PROOF DETAIL (SUPER ADMIN ROUTE)
router.get(
  "/paymentproofs/:id",
  authenticate,
  isAuthorized("Super Admin"),
  handleGetPaymentProofDetail
);

// UPDATE PAYMENT PROOF (SUPER ADMIN ROUTE)
router.put(
  "/paymentproof/status/update/:id",
  authenticate,
  isAuthorized("Super Admin"),
  handleUpdatePaymentProof
);

// DELETE PAYMENT PROOF (SUPER ADMIN ROUTE)
router.delete(
  "/paymentproof/delete/:id",
  authenticate,
  isAuthorized("Super Admin"),
  handleDeletePaymentProof
);

// FETCH ALL USERS (SUPER ADMIN ROUTE)
router.get(
  "/users/getall",
  authenticate,
  isAuthorized("Super Admin"),
  handleFetchAllUsers
);

export default router;
