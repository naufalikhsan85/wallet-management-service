import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    pin_hash: z
      .string()
      .min(1, { message: "pin_hash is required" })
      .transform((val) => val.toLowerCase()),
  });