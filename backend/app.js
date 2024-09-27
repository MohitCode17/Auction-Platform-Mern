import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.route.js";
import auctionRoutes from "./routes/auction.route.js";
import bidRoutes from "./routes/bid.route.js";
import commissionRoutes from "./routes/commission.route.js";
import superAdminRoutes from "./routes/superAdmin.route.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";
import { endedAuctionCron } from "./automation/endAuctionCron.js";

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

// ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auction", auctionRoutes);
app.use("/api/v1/bid", bidRoutes);
app.use("/api/v1/commission", commissionRoutes);
app.use("/api/v1/superadmin", superAdminRoutes);

// RUNNING AUTOMATION
endedAuctionCron();
verifyCommissionCron();

// ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
