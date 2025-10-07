import dotenv from "dotenv";
import { APPConfig } from "./app.configs";
dotenv.config();

export const MailConfig = {
  EMAIL_PROVIDER_HOST: process.env.EMAIL_PROVIDER_HOST || "smtp.gmail.com",
  EMAIL_PROVIDER_PORT: process.env.EMAIL_PROVIDER_PORT || "n/a",
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || "n/a",
  EMAIL_PASS: process.env.EMAIL_PASS || 'n/a',
  VERIFICATION_URL: process.env.VERIFICATION_URL || `http://localhost:${APPConfig.PORT}/v1/registration/verify?token=`,
  VERIFICATION_EXPIRITY: process.env.VERIFICATION_EXPIRITY || 'n/a',
};
