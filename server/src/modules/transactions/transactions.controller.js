import {
  getTransactionsService,
  createTransactionService,
  getTransactionService,
  updateTransactionService,
  deleteTransactionService
} from "./transactions.service.js";

// GET ALL
export const getTransactions = async (req, res) => {
  try {
    const data = await getTransactionsService(
      req.user.userId,
      req.query.type
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE
export const addTransaction = async (req, res) => {
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

// GET ONE
export const getTransaction = async (req, res) => {
  try {
    const data = await getTransactionService(
      req.params.id,
      req.user.userId
    );

    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const updateTransaction = async (req, res) => {
  try {
    const data = await updateTransactionService(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.json(data);
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

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};