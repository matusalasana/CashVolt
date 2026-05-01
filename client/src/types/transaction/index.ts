import { z } from "zod" 

export const transactionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("income"),
    amount: z.number().positive(),
    description: z.string().min(1, "Description is required"),
    account_id: z.number().int().min(1),
    category_id: z.number().int().min(1),
    transaction_date: z.string().min(1, "Transaction date is required"),
  }),

  z.object({
    type: z.literal("expense"),
    amount: z.number().positive(),
    description: z.string().min(1, "Description is required"),
    account_id: z.number().int().min(1),
    category_id: z.number().int().min(1),
    transaction_date: z.string().min(1, "Transaction date is required"),
  }),

  z.object({
    type: z.literal("savings"),
    amount: z.number().positive(),
    description: z.string().min(1, "Description is required"),
    account_id: z.number().int().min(1),
    savings_id: z.number().int().min(1),
    transaction_date: z.string(),
    savings_title: z.string().optional(),
  }),
]);

export type TransactionInput = z.infer<typeof transactionSchema>;