import { sql } from "../config/db.js"

export const getExpenses = async (req, res) => {
  
  try {
    const expenses = await sql`
      SELECT t.*, c.name as category_name, c.color_code 
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.type = 'expense'
      ORDER BY t.transaction_date DESC
    `;
    res.json(expenses);
  } catch(err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
