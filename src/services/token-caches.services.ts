import { redis } from '../connections/redis.connections';

export const cacheJti = async (prefix: string, jti: string, expiresInSeconds: number): Promise<void> => {
  await redis.set(`${prefix}:${jti}`, 'active', 'EX', expiresInSeconds);
};

export const isJtiUsed = async (prefix: string, jti: string): Promise<boolean> => {
  const status = await redis.get(`${prefix}:${jti}`);
  return status !== 'active';
};

export const markJtiAsUsed = async (prefix: string, jti: string): Promise<void> => {
  await redis.del(`${prefix}:${jti}`);
};
