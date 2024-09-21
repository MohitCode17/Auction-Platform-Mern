import express from "express";
import {
  handleFetchLeaderboard,
  handleGetProfile,
  handleLogin,
  handleLogout,
  handleRegister,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegister);

// LOGIN USER ROUTE
router.post("/login", handleLogin);

// LOGOUT USER ROUTE
router.get("/logout", authenticate, handleLogout);

// GET MY PROFILE ROUTE
router.get("/me", authenticate, handleGetProfile);

// GET LEADERBOAD ROUTE
router.get("/leaderboard", handleFetchLeaderboard);

export default router;
