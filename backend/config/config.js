import { config as conf } from "dotenv";
conf();

const _config = {
  PORT: process.env.PORT,
  FROTNEND_URL: process.env.FROTNEND_URL,
};

export const config = Object.freeze(_config);
