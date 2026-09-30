import { z } from 'zod';

export const createAdminUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  interests: z.string().optional(),
});

export const updateAdminUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: 'Password must be at least 6 characters long',
    }),
  role: z.enum(['user', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  interests: z.string().optional(),
});
