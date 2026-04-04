import {
  getAccountsRepo,
  createAccountRepo,
  updateAccountRepo,
  deleteAccountRepo
} from "./accounts.repository.js";

// GET ALL
export const getAccountsService = async (user_id) => {
  if (!user_id) throw new Error("User ID required");

  return await getAccountsRepo(user_id);
};

// CREATE
export const createAccountService = async (data, user_id) => {
  if (!data.name) {
    throw new Error("Account name is required");
  }

  return await createAccountRepo(data.name, user_id);
};

// UPDATE
export const updateAccountService = async (id, data, user_id) => {
  if (!data.name) {
    throw new Error("Account name is required");
  }

  const result = await updateAccountRepo(id, data.name, user_id);

  if (result.length === 0) {
    throw new Error("Account not found");
  }

  return result[0];
};

// DELETE
export const deleteAccountService = async (id, user_id) => {
  const result = await deleteAccountRepo(id, user_id);

  if (result.length === 0) {
    throw new Error("Account not found");
  }

  return true;
};