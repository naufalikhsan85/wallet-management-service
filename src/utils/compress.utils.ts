import zlib from 'zlib';
import { promisify } from 'util';
import base64url from 'base64url';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

const compressToken = async(token: string): Promise<string> =>{
  const gzipped = await gzip(token);
  return base64url(gzipped);
}

const decompressToken = async(compact: string): Promise<string> => {
  const buffer = base64url.toBuffer(compact);
  const ungzipped = await gunzip(buffer);
  return ungzipped.toString();
}

export {
    compressToken,
    decompressToken
}