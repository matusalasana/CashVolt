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

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE 
export const updateTransaction = async (req, res) => {
  try{
    const id = Number(req.params.id);

    const updated = await updateTransactionService(
      id,
      req.body,
      req.user.userId
    );
  
    res.json(updated);
  }catch(err){
    res.status(404).json({ message: err.message });
  }
};


// DELETE
export const deleteTransaction = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteTransactionService(
      id,
      req.user.userId
    );

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};