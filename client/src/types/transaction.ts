import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(), // Added this to match your SQL
  
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  
  type: z.enum(["income", "expense", "transfer"]),
  
  source: z.string().min(2, "Source is too short").max(100),
  
  description: z.string().optional().nullable(), // Added .nullable()
  
  // FIX: category_id can be null in your DB (ON DELETE SET NULL)
  category_id: z.number().int().positive().nullable().optional(), 
  
  account_id: z.number().int().positive(),
  
  transaction_date: z.string().min(1, "Date is required"),
});

export type Transaction = z.infer<typeof TransactionSchema>;