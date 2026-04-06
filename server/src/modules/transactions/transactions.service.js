import {
  getTransactionsRepoWithType,
  getTransactionsRepoWithoutType,
  createTransactionRepo,
  deleteTransactionRepo
} from "./transactions.repository.js";

// GET ALL
export const getTransactionsService = async (type, user_id) => {
  
  if(!user_id){
    throw new Error("user_id is required")
  }
  const cleanType = type || null
  if(cleanType && !(['income', 'expense']).includes(cleanType)){
    throw new Error("Invalid transaction type")
  }
  if(!cleanType){
    return await getTransactionsRepoWithoutType(user_id);
  }
  return await getTransactionsRepoWithType(type, user_id);
};

// CREATE
export const createTransactionService = async (data, user_id) => {
  const {
    amount,
    type,
    account_id,
    category_id
  } = data;

  if (!amount || !type || !account_id || !category_id) {
    throw new Error("Missing required fields");
  }

  if (!["income", "expense"].includes(type)) {
    throw new Error("Invalid transaction type");
  }

  return await createTransactionRepo(data, user_id);
};

// DELETE
export const deleteTransactionService = async (id, user_id) => {
  const result = await deleteTransactionRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Transaction not found");
  }

  return true;
};