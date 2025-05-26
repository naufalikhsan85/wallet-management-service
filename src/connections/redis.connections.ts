import Redis from 'ioredis';
import { RedisConfig } from '../configs/redis.configs';

export const redis = new Redis({
  host: RedisConfig.REDIS_HOST,
  port: RedisConfig.REDIS_PORT,
  password: RedisConfig.REDIS_PASS,
});
