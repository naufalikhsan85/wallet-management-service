import { z } from 'zod';

const emailOrPhoneSchema = z.string().refine((val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{8,15}$/; // Contoh validasi global phone number
  return emailRegex.test(val) || phoneRegex.test(val);
}, {
  message: "Must be a valid email or phone number",
}).transform((val) => val.toLowerCase());

const RegistrationParamsSchema = z.object({
  contact: emailOrPhoneSchema,
});

const verificationParamsSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});


export {
    RegistrationParamsSchema,
    verificationParamsSchema
}