import {
  getCategoriesRepoWithType,
  getCategoriesRepoWithoutType,
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

  if (!type) {
    return await getCategoriesRepoWithoutType(user_id);
  }

  return await getCategoriesRepoWithType(user_id, type);
};

// CREATE
export const createCategoryService = async (data, user_id) => {
  const { name, type } = data;

  if (!name || name.trim() === "") {
    throw new Error("Category name is required");
  }

  if (!["income", "expense"].includes(type)) {
    throw new Error("Invalid category type");
  }

  return await createCategoryRepo(name, type, user_id);
};

// UPDATE
export const updateCategoryService = async (id, data, user_id) => {
  const { name, type } = data;

  const fields = {};

  if (name !== undefined) {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    fields.name = name;
  }

  if (type !== undefined) {
    if (!["income", "expense"].includes(type)) {
      throw new Error("Invalid category type");
    }
    fields.type = type;
  }

  const result = await updateCategoryRepo(id, fields, user_id);

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

  return result[0];
};