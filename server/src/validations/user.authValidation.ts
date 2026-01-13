import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('Invalid Email').trim(),
  password: z
    .string('Invalid, password must be string')
    .min(8, 'Minimum 8 characters length is required')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ).trim(),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identifier: z.string('Invalid, enter valid email or username').trim(),
  password: z.string('Invalid, enter valid password').trim(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
