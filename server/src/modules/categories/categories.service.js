import {
  getCategoriesRepo,
  createCategoryRepo,
  updateCategoryRepo,
  deleteCategoryRepo
} from "./categories.repository.js";

// GET ALL
export const getCategoriesService = async (user_id, type) => {
  if (!user_id) {
    throw new Error("user_id is required");
  }

  if (type && !["income", "expense"].includes(type)) {
    throw new Error("Invalid category type");
  }

  const result = await getCategoriesRepo(user_id, type);
  
  return result;
};

// CREATE
export const createCategoryService = async (data, user_id) => {
  const { name, type } = data;
  
  if (!name || !name.trim()) throw new Error("Category name is required");
  if (!type) throw new Error("Category type is required");
  if (!["income", "expense"].includes(type)) throw new Error("Invalid category type");
  if (!user_id) throw new Error("User ID required");
  
  const result = await createCategoryRepo(name.trim(), type, user_id);
  return result;
};

// UPDATE
export const updateCategoryService = async (id, data, user_id) => {

  const result = await updateCategoryRepo(id, data, user_id);

  if (!result) {
    throw new Error("Category not found");
  }

  return result;
};

// DELETE
export const deleteCategoryService = async (id, user_id) => {
  const result = await deleteCategoryRepo(id, user_id);

  if (!result) {
    throw new Error("Category not found");
  }

  return result;
};