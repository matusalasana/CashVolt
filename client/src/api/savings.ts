import API from "./api";
import { type SavingsInput } from "../types";

type UpdateSavingsInput = {
  id: number;
  data: SavingsInput;
};


// GET ALL SAVINGS
export const getSavings = async () => {
  const res = await API.get("/savings");
  return res.data;
};


// GET SINGLE SAVINGS
export const getSingleSavings = async (id: number) => {
  const res = await API.get(`/savings/${id}`);
  return res.data;
};


// CREATE SAVINGS
export const createSavings = async (data: SavingsInput) => {
  const res = await API.post("/savings", data);
  return res.data;
};


// UPDATE SAVINGS
export const updateSavings = async ({ id, data }: UpdateSavingsInput) => {
  const res = await API.put(`/savings/${id}`, data);
  return res.data;
};


// DELETE SAVINGS
export const deleteSavings = async (id: number) => {
  const res = await API.delete(`/savings/${id}`);
  return res.data;
};