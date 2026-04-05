import {
  getBudgetsRepo,
  createBudgetRepo,
  updateBudgetRepo,
  deleteBudgetRepo,
  getBudgetByIdRepo
} from "./budgets.repository.js";

// GET ALL
export const getBudgetsService = async (user_id) => {
  return await getBudgetsRepo(user_id);
};

// CREATE
export const createBudgetService = async (data, user_id) => {
  const { category_id, amount, month } = data;

  if (!category_id || !amount || !month) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Budget must be greater than 0");
  }

  return await createBudgetRepo(data, user_id);
};

// UPDATE
export const updateBudgetService = async (id, data, user_id) => {
  const existing = await getBudgetByIdRepo(id, user_id);

  if (!existing) {
    throw new Error("Budget not found");
  }

  return await updateBudgetRepo(id, data, user_id);
};

// DELETE
export const deleteBudgetService = async (id, user_id) => {
  const result = await deleteBudgetRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Budget not found");
  }

  return true;
};