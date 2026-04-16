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
});

export const transactionSchema = z.object({
  id: z.number().int().optional(),
  account_name: z.string().optional(),
  category_name: z.string(). optional(),
  type: z.enum(["income", "expense"]),
  transaction_type: z.enum(["income", "expense"]).optional(),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  account_id: z.coerce.number().int().min(1, "Account is required"),
  category_id: z.coerce.number().int().min(1, "Category is required"),
  transaction_date: z.string().min(1, "Date is required"),
  created_at: z.string().optional(),
});

export const budgetSchema = z.object({
  id: z.number().int().optional(),
  category_id: z.coerce.number().int().min(1, "Category is required"),
  category_name: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be positive"),
  month: z.coerce.number().min(1, "Date is required"),
  year: z.coerce.number().optional()
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

export type BudgetPayload = {
  category_id: number;
  amount: number;
  month: number;
  year: number;
};


export type UserInput = z.infer<typeof userSchema>;
export type AccountInput = z.infer<typeof accountSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type BudgetInput = z.infer<typeof budgetSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;