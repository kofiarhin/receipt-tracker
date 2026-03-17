const path = require("path");
const dotenv = require("dotenv");

const loadEnv = () => {
  dotenv.config();

  const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "CLIENT_URL"];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  if (
    (process.env.OCR_PROVIDER || "google-vision") === "google-vision" &&
    !process.env.GOOGLE_APPLICATION_CREDENTIALS
  ) {
    throw new Error(
      "Missing GOOGLE_APPLICATION_CREDENTIALS for Google Vision OCR",
    );
  }

  return {
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    clientUrl: process.env.CLIENT_URL,
    ocrProvider: process.env.OCR_PROVIDER || "google-vision",
    googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : null,
  };
};

module.exports = {
  loadEnv,
};
