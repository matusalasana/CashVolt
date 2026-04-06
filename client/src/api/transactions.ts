import API from "./api";
import { type TransactionInput } from "../types";

type UpdateTransactionInput = {
  id: number;
  data: TransactionInput;
};

export const getTransactions = async (type?: string) => {
  const res = await API.get("/transactions", {
    params: type ? { type } : {}
  });
  return res.data;
};

export const createTransaction = async (data: TransactionInput) => {
  const res = await API.post("/transactions", data);
  return res.data;
};

export const updateTransaction = async ({id, data}: UpdateTransactionInput) => {
  const res = await API.put(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: number) => {
  const res = await API.delete(`/transactions/${id}`);
  return res.data;
};