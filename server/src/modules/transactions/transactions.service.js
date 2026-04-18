import {
  getTransactionsRepo,
  createTransactionRepo,
  updateTransactionRepo,
  deleteTransactionRepo,
  getAccountById, 
  getCategoryById,
  getTransactionById
} from "./transactions.repository.js";

// GET
export const getTransactionsService = async (
  type,
  user_id,
  limit = 10,
  offset = 0,
) => {
  if (!user_id) throw new Error("user_id is required");

  if (type && !["income", "expense"].includes(type)) {
    throw new Error("Invalid transaction type");
  }

  return await getTransactionsRepo(
    user_id,
    type,
    limit,
    offset,
  );
};

// CREATE
export const createTransactionService = async (data, user_id) => {
  const { amount, type, account_id, category_id } = data;

  if (amount == null || typeof amount !== "number") {
    throw new Error("Valid amount is required");
  }

  if (!["income", "expense"].includes(type)) {
    throw new Error("Invalid transaction type");
  }

  if (account_id == null || isNaN(account_id)) {
    throw new Error("Valid account_id is required");
  }

  if (category_id == null || isNaN(category_id)) {
    throw new Error("Valid category_id is required");
  }
  
  const account = await getAccountById(account_id, user_id);
  if (!account[0]) {
    throw new Error("Invalid account");
  }
  
  const category = await getCategoryById(category_id, user_id);
  if (!category[0]) {
    throw new Error("Invalid category");
  }
  const transaction = await createTransactionRepo(data, user_id);

  return transaction;
};

// UPDATE
export const updateTransactionService = async (id, data, user_id) => {
  if (!id) throw new Error("Transaction id is required");

  const { amount, type, account_id, category_id, transaction_date, description} = data;

  if (amount != null && typeof amount !== "number") {
    throw new Error("Invalid amount");
  }

  if (type && !["income", "expense"].includes(type)) {
    throw new Error("Invalid transaction type");
  }

  if (account_id != null) {
    const [account] = await getAccountById(account_id, user_id);
    if (!account) throw new Error("Invalid account");
  }

  if (category_id != null) {
    const [category] = await getCategoryById(category_id, user_id);
    if (!category) throw new Error("Invalid category");

    if (type && category.type !== type) {
      throw new Error("Category does not match transaction type");
    }
  }

  const result = await updateTransactionRepo(id, data, user_id);

  if (result.length === 0) {
    throw new Error("Transaction not found");
  }

  return result;
};

// DELETE 
export const deleteTransactionService = async (id, user_id) => {
  const [isTransactionFound] = await getTransactionById(id, user_id)
  if(!isTransactionFound){
    throw new Error ("Transaction not found")
  }
  const result = await deleteTransactionRepo(id, user_id)
  return result
}