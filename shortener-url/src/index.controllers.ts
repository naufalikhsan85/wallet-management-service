import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { redis } from './redis.connections';
import dotenv from "dotenv";
dotenv.config();

const prefix = "url_shortener"

const register = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (typeof url !== 'string' || !url.trim()) {
    res.status(400).json({ error: 'Invalid URL' });
    return
  }

  const shortCode = nanoid(6);

  try {
    const result = await redis.set(`${prefix}:${shortCode}`, url, 'EX', 60 * Number(process.env.REDIS_REGIS_EXPIRITY))

    if (result !== 'OK') {
      throw new Error('Redis SET failed');
    }

    res.status(201).json({ short: shortCode });
    return
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return
  }
};

const resolve = async (req: Request, res: Response) => {
  const { short } = req.params;

  try {
    const url = await redis.get(`${prefix}:${short}`);

    if (url) {
      res.redirect(url);
      return
    } else {
      res.status(404).json({ error: 'Short URL not found' });
      return
    }
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return
  }
}

export {
  register,
  resolve
}