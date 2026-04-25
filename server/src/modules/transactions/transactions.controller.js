import {
  getTransactionsService,
  createTransactionService,
  updateTransactionService,
  deleteTransactionService
} from "./transactions.service.js";


// GET ALL
export const getTransactions = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { type, sortBy, order, limit, offset } = req.query;

    const data = await getTransactionsService(
      user_id,
      type,
      sortBy,
      order,
      limit,
      offset
    );

    return res.status(200).json(data);

  } catch (err) {
    console.log("Get transactions error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// CREATE
export const createTransaction = async (req, res) => {
  try {
    const data = await createTransactionService(
      req.body,
      req.user.userId
    );

    return res.status(201).json(data);

  } catch (err) {
    console.log("Create transaction error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// UPDATE
export const updateTransaction = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updated = await updateTransactionService(
      id,
      req.body,
      req.user.userId
    );

    if (!updated) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    return res.status(200).json(updated);

  } catch (err) {
    console.log("Update transaction error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// DELETE
export const deleteTransaction = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteTransactionService(
      id,
      req.user.userId
    );

    if (!result) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    return res.status(200).json({
      message: "Transaction deleted"
    });

  } catch (err) {
    console.log("Delete transaction error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};