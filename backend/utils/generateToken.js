import { config } from "../config/config.js";

export const generateToken = (user, res, statusCode, message) => {
  const token = user.generateJwtToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + config.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
