import {
  getBudgetsRepo,
  createBudgetRepo,
  updateBudgetRepo,
  deleteBudgetRepo,
  getBudgetByIdRepo,
  getCategoryByIdRepo
} from "./budgets.repository.js";

// GET ALL
export const getBudgetsService = async (user_id, month, year) => {
  return await getBudgetsRepo(user_id, month, year);
};

// CREATE
export const createBudgetService = async (data, user_id) => {
  const { category_id, amount, month, year } = data;

  if (!category_id || !amount || !month || !year) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Budget must be greater than 0");
  }
  
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }
  if (year < 2000 || year > 2100) {
    throw new Error("Invalid year");
  }
  
  const category = await getCategoryByIdRepo(category_id, user_id);
  if (!category) throw new Error("Invalid category");
  
  const result = await createBudgetRepo(data, user_id);

  return result;
};

// UPDATE
export const updateBudgetService = async (id, data, user_id) => {
  const existing = await getBudgetByIdRepo(id, user_id);
  const { amount } = data;

  if (!existing) {
    throw new Error("Budget not found");
  }
  

  if (amount !== undefined) {
    if (amount <= 0) throw new Error("Budget must be greater than 0");
    if (isNaN(amount)) throw new Error("Valid amount is required");
  }

  return await updateBudgetRepo(id, data, user_id);
};

// DELETE
export const deleteBudgetService = async (id, user_id) => {
  const result = await deleteBudgetRepo(id, user_id);

  if (!result) {
    throw new Error("Budget not found");
  }

  return true;
};