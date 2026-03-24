import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(), 
  
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  
  type: z.enum(["income", "expense", "transfer"]),
  
  source: z.string().min(2, "Source is too short").max(100),
  
  description: z.string().optional().nullable(),
  
  category_id: z.number().int().positive().nullable().optional(), 
  
  account_id: z.number().int().positive(),
  
  transaction_date: z.string().min(1, "Date is required"),
});

export type Transaction = z.infer<typeof TransactionSchema>;