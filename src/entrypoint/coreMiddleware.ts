// src/coreMiddleware.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { APPConfig } from '../configs/app.configs'

// Set limit default
const maxSize: number = Number(APPConfig.MAX_SIZE) || 1

// Middleware utama
const coreMiddleware = [
  // CORS basic
  cors(),

  // Body parser
  express.json({ limit: `${maxSize}mb` }),
  express.urlencoded({ limit: `${maxSize}mb`, extended: true }),

  // Custom header untuk CORS
  (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  },
];

export default coreMiddleware;
