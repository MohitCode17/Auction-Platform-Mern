import express from "express";
import { handleRegister } from "../controllers/user.controller";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegister);

// LOGIN USER ROUTE

// LOGOUT USER ROUTE

// GET MY PROFILE ROUTE

// GET LEADERBOAD ROUTE

export default router;
