import {
  getAccountsRepo,
  createAccountRepo,
  updateAccountRepo,
  deleteAccountRepo,
  findAccountByIdRepo
} from "./accounts.repository.js";

// GET ALL
export const getAccountsService = async (user_id) => {
  if (!user_id) throw new Error("User ID required");

  return await getAccountsRepo(user_id);
};

// CREATE
export const createAccountService = async (data, user_id) => {
  const { name } = data;
  if (!name) {
    throw new Error("Account name is required");
  }
  const cleanAccountName = name.toUpperCase().trim()
  if (!user_id) throw new Error("User ID required");

  return await createAccountRepo(cleanAccountName, user_id);
};

// UPDATE
export const updateAccountService = async (id, data, user_id) => {
  const { name } = data;
  if (!name) {
    throw new Error("Account name is required");
  }
  if (!user_id) throw new Error("User ID required");
  const cleanAccountName = name.toUpperCase().trim()
  const isAccountFound = await findAccountByIdRepo(id, user_id)
  if (!isAccountFound) {
    throw new Error("Account not found");
  }
  const result = await updateAccountRepo(id, cleanAccountName, user_id);
  if (!result) {
    throw new Error("Account not found or unauthorized");
  }

  return result;
};

// DELETE
export const deleteAccountService = async (id, user_id) => {
  if (!user_id) throw new Error("User ID required");
  
  const account = await findAccountByIdRepo(id, user_id);
  if (!account) {
    throw new Error("Account not found");
  }
  
  await deleteAccountRepo(id, user_id);
  return true;
};