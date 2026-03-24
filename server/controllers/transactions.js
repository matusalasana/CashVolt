export const getTransactions = async (req, res) => {
  const { type } = req.query; // e.g., /transactions?type=expense
  const userId = req.user.id; // From your Auth middleware

  try {
    const transactions = await sql`
      SELECT t.*, c.name AS category_name, c.icon_name, c.color_code
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ${userId}
      ${type ? sql`AND t.type = ${type}` : sql``}
      ORDER BY t.transaction_date DESC;
    `;
    res.json(transactions);
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET SINGLE
export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const [transaction] = await sql`
      SELECT t.*, c.name as category_name 
      FROM transactions t 
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ${id} AND t.user_id = ${req.user.id}`;
    
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json(transaction);
  } catch (err) { res.status(500).json({ error: "Error fetching" }); }
};

// CREATE
export const addTransaction = async (req, res) => {
  const { account_id, category_id, amount, type, source, description, transaction_date } = req.body;
  try {
    const [newTx] = await sql`
      INSERT INTO transactions (user_id, account_id, category_id, amount, type, source, description, transaction_date)
      VALUES (${req.user.id}, ${account_id}, ${category_id}, ${amount}, ${type}, ${source}, ${description}, ${transaction_date})
      RETURNING *`;
    res.status(201).json(newTx);
  } catch (err) { res.status(500).json({ error: "Save failed" }); }
};

// UPDATE
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, source, description, category_id } = req.body;
  try {
    const [updated] = await sql`
      UPDATE transactions 
      SET amount = ${amount}, source = ${source}, description = ${description}, category_id = ${category_id}
      WHERE id = ${id} AND user_id = ${req.user.id}
      RETURNING *`;
    res.json(updated);
  } catch (err) { res.status(500).json({ error: "Update failed" }); }
};

// DELETE
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM transactions WHERE id = ${id} AND user_id = ${req.user.id}`;
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: "Delete failed" }); }
};
