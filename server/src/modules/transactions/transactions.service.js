import {
  getTransactionsRepo,
  createTransactionRepo,
  getTransactionByIdRepo,
  updateTransactionRepo,
  deleteTransactionRepo
} from "./transactions.repository.js";

// GET ALL
export const getTransactionsService = async (user_id, type) => {
  if (!user_id) {
    throw new Error("User ID required");
  }

  return await getTransactionsRepo(user_id, type);
};

// CREATE
export const createTransactionService = async (data, user_id) => {
  const { amount, account_id, category_id, transaction_date } = data;

  if (!amount || !account_id || !category_id || !transaction_date) {
    throw new Error("Missing required fields");
  }

  return await createTransactionRepo({
    ...data,
    user_id
  });
};

// GET ONE
export const getTransactionService = async (id, user_id) => {
  const result = await getTransactionByIdRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Transaction not found");
  }

  return result[0];
};

// UPDATE
export const updateTransactionService = async (id, user_id, data) => {
  const result = await updateTransactionRepo(id, user_id, data);

  if (result.length === 0) {
    throw new Error("Transaction not found");
  }

  return result[0];
};

// DELETE
export const deleteTransactionService = async (id, user_id) => {
  const result = await deleteTransactionRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Transaction not found");
  }

  return true;
};