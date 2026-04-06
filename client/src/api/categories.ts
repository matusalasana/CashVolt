import API from "./api";
import { type CategoryInput } from "../types";

type UpdateCategoryInput = {
  id: number;
  data: CategoryInput;
}

export const getCategories = async (type?: string) => {
  const res = await API.get("/categories", {
    params: type ? { type } : {}
  });
  return res.data;
};

export const createCategory = async (data: CategoryInput) => {
  const res = await API.post("/categories", data);
  return res.data;
};

export const updateCategory = async ({data, id}: UpdateCategoryInput) => {
  const res = await API.put(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data;
};