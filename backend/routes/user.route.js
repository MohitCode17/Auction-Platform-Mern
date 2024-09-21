import express from "express";
import {
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
router.get("/logout", handleLogout);

// GET MY PROFILE ROUTE
router.get("/me", authenticate, handleGetProfile);

// GET LEADERBOAD ROUTE

export default router;
