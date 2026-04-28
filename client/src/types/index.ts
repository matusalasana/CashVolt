import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  currency: z.string().optional(),
  role: z.string().optional().default("user"),
});

export const profileSchema = z.object({
  first_name: z.string().min(2, "At least 2 characters are required"),
  last_name: z.string().min(2, "Must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
});

export const updateUserSchema = z.object({
  id: z.number().int().optional(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
  profile_picture: z.string().optional(),
  created_at: z.string().optional(),
});



export const accountSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Account name is required"),
  available_balance: z.number().optional(),
  recent_transaction_amount: z.number().optional(),
  recent_transaction_type: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["income", "expense", "savings"]),
});

export const savingsSchema = z.object({
  id: z.number().int().optional(),

  user_id: z.number().int().optional(),

  title: z.string().min(1, "Title is required").trim(),

  target_amount: z.number().positive("Target amount must be greater than 0"),

  due_date: z.string().optional(),
  
  current_amount: z.number().optional(),
  
  days_left: z.number().optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional()
});


export const transactionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("income"),
    amount: z.number().positive(),
    description: z.string().min(1),
    account_id: z.number().int().min(1),
    category_id: z.number().int().min(1),
    transaction_date: z.string(),
  }),

  z.object({
    type: z.literal("expense"),
    amount: z.number().positive(),
    description: z.string().min(1),
    account_id: z.number().int().min(1),
    category_id: z.number().int().min(1),
    transaction_date: z.string(),
  }),

  z.object({
    type: z.literal("savings"),
    amount: z.number().positive(),
    description: z.string().min(1),
    account_id: z.number().int().min(1),
    savings_id: z.number().int().min(1),
    transaction_date: z.string(),
  }),
]);

export const budgetSchema = z.object({
  id: z.number().int().optional(),
  category_id: z.number().int().min(1),
  amount: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().optional(),
  category_name: z.string().optional(),
  spent: z.number().optional(),
  remaining: z.number().optional(),
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

export type TransactionFormValues = {
  type: "income" | "expense" | "savings";
  amount: number;
  description: string;
  account_id: number;
  category_id: number;
  transaction_date: string;
};

export type UserInput = z.infer<typeof userSchema>;
export type ProfileFormInput = z.infer<typeof profileSchema>;

export type UserUpdateInput = z.infer<typeof updateUserSchema>;
export type AccountInput = z.infer<typeof accountSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type SavingsInput = z.infer<typeof savingsSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type BudgetInput = z.infer<typeof budgetSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;