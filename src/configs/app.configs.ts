import dotenv from "dotenv";
dotenv.config();

export const APPConfig = {
  BASEPATH: process.env.BASEPATH || "",
  PORT: process.env.PORT || 8080,
  MAX_SIZE: Number(process.env.MAX_SIZE) || 1,
  LOGS: process.env.LOGS || "./",
  ENABLE_STREAMLOG: Boolean(process.env.ENABLE_STREAMLOG) || false,
};