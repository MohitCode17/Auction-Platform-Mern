import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.route.js";

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

// IMAGE FILEUPLOAD MIDDLEWARE
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// TEST API
app.get("/test", (req, res) => {
  res.send("Run Pass.");
});

// ROUTES
app.use("/api/v1/user", userRoutes);

// ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
