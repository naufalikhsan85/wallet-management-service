import dotenv from "dotenv";
dotenv.config();

export const RedisConfig = {
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6380,
  REDIS_PASS: process.env.REDIS_PASS || "",
  REDIS_REGIS_EXPIRITY: Number(process.env.REDIS_REGIS_EXPIRITY) || 60
};
