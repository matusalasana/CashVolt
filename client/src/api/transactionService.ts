import api from "./api";
import { Transaction } from "../types/transaction";

export const transactionService = {
  // Get all transactions (income and expenses )
  getAll: async (type?: string) => {
    const response = await api.get("/transactions", { 
      params: { type } // This allows /transactions?type=expense
    });
    return response.data;
  },
  
   // 2. GET SINGLE expense/income
  getOne: async (id: string) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // CREATE a new expense/income
  create: async (data: Transaction) => {
    const response = await api.post("/transactions", data);
    return response.data;
  },
  
    // UPDATE a specific Expense or income 
  update: async (id: string, data: Partial<Transaction>) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  // DELETE a specific Expense or income 
  delete: async (id: string) => {
    await api.delete(`/transactions/${id}`);
  }
};
