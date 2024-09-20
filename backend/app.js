import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config.js";

const app = express();

// CORS CONFIGURAITON
app.use(
  cors({
    origin: config.FROTNEND_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);

// DEFAULT MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST API
app.get("/test", (req, res) => {
  res.send("Run Pass.");
});

export default app;
