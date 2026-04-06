import {
  getTransactionsService,
  createTransactionService,
  deleteTransactionService
} from "./transactions.service.js";

// GET ALL
export const getTransactions = async (req, res) => {
  try {
    const { type } = req.query;
    const user_id = req.user.userId;
    const data = await getTransactionsService(type, user_id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE
export const createTransaction = async (req, res) => {
  try {
    const data = await createTransactionService(
      req.body,
      req.user.userId
    );

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteTransaction = async (req, res) => {
  try {
    await deleteTransactionService(
      req.params.id,
      req.user.userId
    );

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};