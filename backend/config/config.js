import { config as conf } from "dotenv";
conf();

const _config = {
  PORT: process.env.PORT,
  FROTNEND_URL: process.env.FROTNEND_URL,
  MONGODB_URL: process.env.MONGODB_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
