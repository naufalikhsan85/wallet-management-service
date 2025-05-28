import { z } from 'zod';

const PINCreationSchema = z.object({
  uuid: z.string().uuid({ message: "Invalid UUID format" }),
  pin_hash: z.string().min(1, { message: "pin_hash is required" }).toLowerCase(),
});


export {
    PINCreationSchema
}