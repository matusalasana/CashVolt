import { sql } from "../config/db.js";


// get all transactions 
export const getTransactions = async (req, res) => {
  try {
    const { type } = req.query;
    const user_id = req.user.userId;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    
    let transactions;

    if (type) {
      transactions = await sql`
        SELECT 
          t.id,
          t.amount,
          t.description,
          t.account_id,
          t.category_id,
          t.transaction_date,
        
          a.name AS account_name,
          c.name AS category_name,
          c.type AS transaction_type
        
        FROM transactions t 
        LEFT JOIN accounts a ON t.account_id = a.id 
        LEFT JOIN categories c ON t.category_id = c.id 
        
        WHERE t.user_id = ${user_id} 
        AND c.type = ${type}
      `;
    } else {
      transactions = await sql`
        SELECT 
          t.id,
          t.amount,
          t.description,
          t.account_id,
          t.category_id,
          t.transaction_date,
        
          a.name AS account_name,
          c.name AS category_name,
          c.type AS transaction_type
        
        FROM transactions t 
        LEFT JOIN accounts a ON t.account_id = a.id 
        LEFT JOIN categories c ON t.category_id = c.id 
        
        WHERE t.user_id = ${user_id}
              `;
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add transaction
export const addTransaction = async ( req, res ) => {
  try {
    const {
      amount,
      description,
      account_id,
      category_id,
      transaction_date
    } = req.body;
    
    const user_id = req.user.userId;

    // Validation
    if (!amount || !user_id || !account_id || !category_id || !transaction_date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert transaction
    const result = await sql`
      INSERT INTO transactions (
        amount,
        description,
        user_id,
        account_id,
        category_id,
        transaction_date
      )
      VALUES (
        ${amount},
        ${description},
        ${user_id},
        ${account_id},
        ${category_id},
        ${transaction_date}
      )
      RETURNING *;
    `;

    res.status(201).json(result[0]);

  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific transaction 
export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;

    const result = await sql`
      SELECT *
      FROM transactions
      WHERE id = ${id} AND user_id = ${user_id};
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(result[0]);
    
  } catch (error) {
    console.error("Get One Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a specific transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;
    const {
      amount,
      description,
      account_id,
      category_id,
      transaction_date
    } = req.body;

    const result = await sql`
      UPDATE transactions
      SET 
        amount = ${amount},
        description = ${description},
        account_id = ${account_id},
        category_id = ${category_id},
        transaction_date = ${transaction_date}
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(result[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a specific transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;

    const result = await sql`
      DELETE FROM transactions
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};