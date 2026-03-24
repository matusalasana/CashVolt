import { sql } from "../config/db.js"

// Hardcoded for testing until Auth is ready
const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000";

// 1. GET ALL
export const getTransactions = async (req, res) => {
  const { type } = req.query;
  try {
    const transactions = await sql`
      SELECT t.*, c.name AS category_name, c.icon_name, c.color_code
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ${TEST_USER_ID}
      ${type ? sql`AND t.type = ${type}` : sql``}
      ORDER BY t.transaction_date DESC;
    `;
    res.json(transactions);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. GET SINGLE
export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const [transaction] = await sql`
      SELECT t.*, c.name as category_name 
      FROM transactions t 
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ${id} AND t.user_id = ${TEST_USER_ID}`;
    
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (err) { 
    console.error("❌ Get One Error:", err);
    res.status(500).json({ error: "Error fetching transaction" }); 
  }
};

// 3. CREATE
export const addTransaction = async (req, res) => {
  const { account_id, category_id, amount, type, source, description, transaction_date } = req.body;
  try {
    const [newTx] = await sql`
      INSERT INTO transactions (user_id, account_id, category_id, amount, type, source, description, transaction_date)
      VALUES (${TEST_USER_ID}, ${account_id}, ${category_id}, ${amount}, ${type}, ${source}, ${description}, ${transaction_date})
      RETURNING *`;
    res.status(201).json(newTx);
  } catch (err) { 
    console.error("❌ Add Error:", err);
    res.status(500).json({ error: "Save failed" }); 
  }
};

// 4. UPDATE
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, source, description, category_id, type } = req.body;
  try {
    const [updated] = await sql`
      UPDATE transactions 
      SET amount = ${amount}, source = ${source}, description = ${description}, category_id = ${category_id}, type = ${type}
      WHERE id = ${id} AND user_id = ${TEST_USER_ID}
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
    const result = await sql`DELETE FROM transactions WHERE id = ${id} AND user_id = ${TEST_USER_ID} RETURNING id`;
    
    if (result.length === 0) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { 
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: "Delete failed" }); 
  }
};