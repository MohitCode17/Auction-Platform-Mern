import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Database connected successfully.`);
    });
    mongoose.connection.on("error", (err) => {
      console.log(`Error connect to database: ${err}`);
    });

    await mongoose.connect(config.MONGODB_URL);
  } catch (error) {
    console.log(`Failed to connect database`);
    process.exit(1);
  }
};
