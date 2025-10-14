import { z } from 'zod';

const PINCreationSchema = z.object({
  uuid: z.string().uuid({ message: "Invalid UUID format" }),
  token: z.string().uuid({ message: "Invalid UUID format" }),
  pin_hash: z
    .string()
    .min(1, { message: "pin_hash is required" })
    .transform((val) => val.toLowerCase()),
});

const PINUpdateSchema = z
  .object({
    uuid: z.string().uuid({ message: "Invalid UUID format" }),
    old_pin_hash: z
      .string()
      .min(1, { message: "old_pin_hash is required" })
      .transform((val) => val.toLowerCase()),
    new_pin_hash: z
      .string()
      .min(1, { message: "new_pin_hash is required" })
      .transform((val) => val.toLowerCase()),
  })
  .refine(
    (data) => data.old_pin_hash !== data.new_pin_hash,
    {
      message: "New PIN must be different from the old PIN",
      path: ["new_pin_hash"],
    }
  );


export {
  PINCreationSchema,
  PINUpdateSchema
}