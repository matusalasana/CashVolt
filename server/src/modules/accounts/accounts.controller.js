import {
  getAccountsService,
  createAccountService,
  updateAccountService,
  deleteAccountService
} from "./accounts.service.js";

// GET ALL
export const getAccounts = async (req, res) => {
  try {
    const data = await getAccountsService(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE
export const createAccount = async (req, res) => {
  try {
    const data = await createAccountService(
      req.body,
      req.user.userId
    );

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updateAccount = async (req, res) => {
  try {
    const data = await updateAccountService(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteAccount = async (req, res) => {
  try {
    await deleteAccountService(
      req.params.id,
      req.user.userId
    );

    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};