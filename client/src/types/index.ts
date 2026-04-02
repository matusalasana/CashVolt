import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional().default("user"),
});

export const accountSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Account name is required"),
});

export const categorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["income", "expense"]),
  user_id: z.number().int(),
});

export const transactionSchema = z.object({
  id: z.number().int().optional(),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  account_id: z.coerce.number().int().min(1, "Account is required"),
  category_id: z.coerce.number().int().min(1, "Category is required"),
  transaction_date: z.string().min(1, "Date is required"),
  created_at: z.string().optional(),
});

export const registerSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userSchema.omit({ password: true }),
});


export type UserInput = z.infer<typeof userSchema>;
export type AccountInput = z.infer<typeof accountSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export type AuthResponse = z.infer<typeof authResponseSchema>;