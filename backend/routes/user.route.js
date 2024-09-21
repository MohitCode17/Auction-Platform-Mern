import express from "express";
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../controllers/user.controller.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegister);

// LOGIN USER ROUTE
router.post("/login", handleLogin);

// LOGOUT USER ROUTE
router.get("/logout", handleLogout);

// GET MY PROFILE ROUTE

// GET LEADERBOAD ROUTE

export default router;
