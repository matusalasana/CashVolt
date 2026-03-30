import API from "./api";
import { type AccountInput } from "../types";

export const getAccounts = async () => {
  const res = await API.get("/accounts");
  return res.data;
};

export const createAccount = async (data: TransactionInput) => {
  const res = await API.post("/accounts", data);
  return res.data;
};

export const getAccount = async (id: number) => {
  const res = await API.get(`/accounts/${id}`);
  return res.data;
};

export const updateAccount = async (data: TransactionInput, id: number) => {
  const res = await API.put(`/accounts/${id}`, data);
  return res.data;
};

export const deleteAccount = async (id: number) => {
  const res = await API.delete(`/accounts/${id}`);
  return res.data;
};