import API from "./api";
import { type TransactionInput } from "../types";

export const getTransactions = async () => {
  const res = await API.get("/transactions");
  return res.data;
};

export const createTransaction = async (data: TransactionInput) => {
  const res = await API.post("/transactions", data);
  return res.data;
};

export const getTransaction = async (id: number) => {
  const res = await API.get(`/transactions/${id}`);
  return res.data;
};

export const updateTransaction = async (data: TransactionInput) => {
  const res = await API.put(`/transactions/${data.id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: number) => {
  const res = await API.delete(`/transactions/${id}`);
  return res.data;
};