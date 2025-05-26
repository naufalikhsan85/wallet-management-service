import dotenv from "dotenv";
dotenv.config();

export const AuthConfig = {
  REGISTER_PWD_TOKEN: process.env.REGISTER_PWD_TOKEN || "n/a",
  REGISTER_EXPIRES_IN: process.env.REGISTER_EXPIRES_IN || '365d'
};
