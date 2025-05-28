import { createHash } from 'crypto';
import argon2 from 'argon2';

const generateSalt = (length: number = 16): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.?';

  let salt = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters[randomIndex];
  }
  return salt;
};


const hashWithSalt = (input: string, salt: string): string => {
  return createHash('sha256')
    .update(input + salt)
    .digest('hex');
}

const hashWithArgon2 = async (input: string): Promise<string> => {
  return await argon2.hash(input);
};

const verifyArgon2Hash = async (input: string, hashed: string): Promise<boolean> => {
  return await argon2.verify(hashed, input);
};

const currentDate = () => {
    return Math.floor(new Date().getTime() / 1000);
}

const convertUnixTimestampToPrismaDateTime = (unixTimestamp: number): Date =>{
    return new Date(unixTimestamp * 1000);
}
export {
    generateSalt,
    hashWithSalt,
    hashWithArgon2,
    verifyArgon2Hash,
    currentDate,
    convertUnixTimestampToPrismaDateTime
}