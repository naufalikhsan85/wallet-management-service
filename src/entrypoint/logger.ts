// src/logger.ts
import morgan, { StreamOptions } from 'morgan';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { APPConfig } from '../configs/app.configs'

const now = new Date();
const formattedDate = now.toISOString().replace(/[:.]/g, '-');
const logPath = path.join(APPConfig.LOGS, `access-${formattedDate}.log`);

// Setup stream untuk simpan log ke file
const accessLogStream: StreamOptions = {
  write: (message) => fs.appendFileSync(logPath, message),
};

// Tambahkan custom token
morgan.token('type', (req: express.Request): string => {
  return req.headers['content-type'] || 'unknown';
});

// Buat middleware logger custom format
const loggerMiddleware = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" ' +
  ':status :res[content-length] ":referrer" ":user-agent" ":type"',
  { stream: accessLogStream }
);

const loggerToConsole = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

export { loggerMiddleware, loggerToConsole };
