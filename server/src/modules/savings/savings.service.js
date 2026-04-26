import {
  getSavingsRepo,
  getSingleSavingsRepo,
  createSavingsRepo,
  updateSavingsRepo,
  deleteSavingsRepo
} from "./savings.repository.js";


// GET ALL
export const getSavingsService = async (user_id) => {
  if (!user_id) {
    throw new Error("User ID is required");
  }

  const result = await getSavingsRepo(user_id);

  return result;
};


// GET ONE
export const getSingleSavingsService = async (id, user_id) => {
  if (!id) throw new Error("Savings ID is required");
  if (!user_id) throw new Error("User ID is required");

  const result = await getSingleSavingsRepo(id, user_id);

  return result;
};


// CREATE
export const createSavingsService = async (data, user_id) => {
  const { title, target_amount, due_date } = data;

  if (!title || !title.trim()) {
    throw new Error("Savings title is required");
  }

  if (!target_amount) {
    throw new Error("Target amount is required");
  }

  if (isNaN(target_amount) || Number(target_amount) <= 0) {
    throw new Error("Target amount must be a positive number");
  }

  if (!user_id) {
    throw new Error("User ID is required");
  }

  // Optional date validation
  if (due_date && isNaN(Date.parse(due_date))) {
    throw new Error("Invalid due date");
  }

  const result = await createSavingsRepo(
    title.trim(),
    Number(target_amount),
    due_date,
    user_id
  );

  return result;
};


// UPDATE
export const updateSavingsService = async (id, data, user_id) => {
  if (!id) throw new Error("Savings ID is required");
  if (!user_id) throw new Error("User ID is required");

  const { title, target_amount, due_date } = data;

  // Optional validations (only if provided)
  if (title !== undefined && !title.trim()) {
    throw new Error("Title cannot be empty");
  }

  if (target_amount !== undefined) {
    if (isNaN(target_amount) || Number(target_amount) <= 0) {
      throw new Error("Target amount must be a positive number");
    }
  }

  if (due_date && isNaN(Date.parse(due_date))) {
    throw new Error("Invalid due date");
  }

  const result = await updateSavingsRepo(id, data, user_id);

  if (!result) {
    throw new Error("Savings not found");
  }

  return result;
};


// DELETE
export const deleteSavingsService = async (id, user_id) => {
  if (!id) throw new Error("Savings ID is required");
  if (!user_id) throw new Error("User ID is required");

  const result = await deleteSavingsRepo(id, user_id);

  if (!result) {
    throw new Error("Savings not found");
  }

  return result;
};