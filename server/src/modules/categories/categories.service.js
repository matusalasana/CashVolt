import {
  getCategoriesRepo,
  createCategoryRepo,
  updateCategoryRepo,
  deleteCategoryRepo
} from "./categories.repository.js";

// GET ALL
export const getCategoriesService = async (user_id) => {
  if (!user_id) {
    throw new Error("user_id is required");
  }
  return await getCategoriesRepo(user_id);
};

// CREATE
export const createCategoryService = async (data, user_id) => {
  const { name, type } = data;

  if (!name || !type) {
    throw new Error("Name and type are required");
  }

  return await createCategoryRepo(name, type, user_id);
};

// UPDATE
export const updateCategoryService = async (id, data, user_id) => {
  const { name, type } = data;

  const result = await updateCategoryRepo(id, name, type, user_id);

  if (result.length === 0) {
    throw new Error("Category not found");
  }

  return result[0];
};

// DELETE
export const deleteCategoryService = async (id, user_id) => {
  const result = await deleteCategoryRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Category not found");
  }

  return true;
};