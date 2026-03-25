import { sql } from "../config/db.js";

export const getTransactions = async (req, res) => {
  try {
    const { type } = req.query;
    const { user_id } = req.user.id;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    let transactions;

    if (type) {
      transactions = await sql`
        SELECT t.*, c.name AS category_name
        FROM transactions t
        JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = ${user_id}
        AND t.type = ${type}
        ORDER BY t.created_at DESC
      `;
    } else {
      transactions = await sql`
        SELECT t.*, c.name AS category_name
        FROM transactions t
        JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = ${user_id}
        ORDER BY t.created_at DESC
      `;
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. GET SINGLE
export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await sql`
      SELECT (*) FROM transactions 
      WHERE id = ${id}
    `;
    
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (err) { 
    console.error("❌ Get One Error:", err);
    res.status(500).json({ error: "Error fetching transaction" }); 
  }
};

// CREATE transaction
export const addTransaction = async (req, res) => {
  try {
    const { user_id, category_id, amount, type, description } = req.body;

    const newTransaction = await sql
      `INSERT INTO transactions (user_id, category_id, amount, type, description)
       VALUES (${user_id}, ${category_id}, ${amount}, ${type}, ${description})
       RETURNING *`;
    

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

// 4. UPDATE
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { user_id, category_id, amount, type, description } = req.body;
  try {
    const [updated] = await sql`
      UPDATE transactions 
      SET user_id = ${user_id}, category_id = ${category_id}, amount = ${amount}, type = ${type}, type = ${type}, description = ${description}
      WHERE id = ${id}
      RETURNING *`;
    
    if (!updated) return res.status(404).json({ error: "Nothing to update" });
    res.json(updated);
  } catch (err) { 
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: "Update failed" }); 
  }
};

// 5. DELETE
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING id`;
    
    if (result.length === 0) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { 
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: "Delete failed" }); 
  }
};

export const getSummary = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const result = await sql`
      SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS total_expense
      FROM transactions
      WHERE user_id = ${user_id}
    `;

    const summary = result[0];

    const total_income = Number(summary.total_income);
    const total_expense = Number(summary.total_expense);
    const balance = total_income - total_expense;

    res.json({
      total_income,
      total_expense,
      balance,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};