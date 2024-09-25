import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export const sendMail = async ({ email, subject, message }) => {
  // CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    service: config.SMTP_SERVICE,
    auth: {
      user: config.SMTP_MAIL,
      pass: config.SMTP_PASSWORD,
    },
  });

  const options = {
    from: config.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(options);
};
