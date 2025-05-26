import { z } from 'zod';

const RegistrationParamsSchema = z.object({
  email: z.string().email().toLowerCase()
});

const verificationParamsSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});


export {
    RegistrationParamsSchema,
    verificationParamsSchema
}