import { z } from 'zod';

export const SignUpSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
