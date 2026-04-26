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
  user_id,
  type,
  sortBy,
  order,
  limit = 10,
  offset = 0,
) => {
  const limitNum = Number(limit) || 10;
  const offsetNum = Number(offset) || 0;
  const allowedTypes = ["income", "expense", "savings"];
  const allowedSortFields = ["created_at", "amount", "transaction_date"];
  const allowedOrders = ["ASC", "DESC"];
  const normalizedSort = (sortBy || "").trim().toLowerCase();
  const normalizedOrder = order.toUpperCase();
  
  const safeSort = allowedSortFields.includes(normalizedSort)
    ? normalizedSort
    : "created_at";
  const safeOrder = allowedOrders.includes(normalizedOrder) 
    ? normalizedOrder
    : "DESC"
  
  if (!user_id) throw new Error("user_id is required");

  if (type && !allowedTypes.includes(type)) {
    throw new Error("Invalid transaction type");
  }
  
  if (sortBy && !allowedSortFields.includes(sortBy)) {
    throw new Error("Invalid sort field");
  }
  
  const result = await getTransactionsRepo(
    user_id,
    type,
    safeSort,
    safeOrder,
    limit,
    offset,
  );

  return result;
};

// CREATE
export const createTransactionService = async (data, user_id) => {
  const { 
    amount, 
    type, 
    account_id, 
    transaction_date,
    category_id } = data;
  
  const parsedAmount = Number(amount);
  const allowedTypes = ["income", "expense", "savings"];
  
  const account = await getAccountById(account_id, user_id);
  const category = await getCategoryById(category_id, user_id);

  if(!user_id){
    throw new Error("User id is required")
  }
  if (!transaction_date) {
    throw new Error("Transaction date is required");
  }
  if (isNaN(parsedAmount)) {
    throw new Error("Valid amount is required");
  }
  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid transaction type");
  }
  if (account_id == null || isNaN(account_id)) {
    throw new Error("Valid account_id is required");
  }
  if ((category_id == null || isNaN(category_id)) && !type==="savings") {
    throw new Error("Valid category_id is required");
  }
  
  if (!account) {
    throw new Error("Invalid account");
  }
  
  if (!category && !type==="savings") {
    throw new Error("Invalid category");
  }
  
  const result = await createTransactionRepo(data, user_id);

  return result;
};

// UPDATE
export const updateTransactionService = async (id, data, user_id) => {
  const { 
    amount, 
    type, 
    account_id, 
    category_id, 
    transaction_date } = data;
  
  const parsedAmount = Number(amount);
  const allowedTypes = ["income", "expense", "savings"];
  
  const transaction = await getTransactionById(id, user_id);
  const account = await getAccountById(account_id, user_id);
  const category = await getCategoryById(category_id, user_id);

  if(!user_id){
    throw new Error("User id is required")
  }
  if (!id) throw new Error("Transaction id is required");
  if (!transaction_date || isNaN(Date.parse(transaction_date))) {
    throw new Error("Valid transaction date is required");
  }
  if (isNaN(parsedAmount)) {
    throw new Error("Valid amount is required");
  }
  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid transaction type");
  }
  if (account_id == null || isNaN(account_id)) {
    throw new Error("Valid account_id is required");
  }
  if ((category_id == null || isNaN(category_id)) && !type==="savings") {
    throw new Error("Valid category_id is required");
  }
  
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  
  if (!account) {
    throw new Error("Invalid account");
  }
  
  if (!category && !type==="savings") {
    throw new Error("Invalid category");
  }

  const result = await updateTransactionRepo(id, data, user_id);
  
  return result;
};

// DELETE 
export const deleteTransactionService = async (id, user_id) => {
  const transaction = await getTransactionById(id, user_id)
  if(!transaction){
    throw new Error ("Transaction not found")
  }
  const result = await deleteTransactionRepo(id, user_id)
  
  return result
}