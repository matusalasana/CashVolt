import { sql } from "../config/db.js"

export const getExpenses = async (req, res) => {
  try {
    const expenses = await sql`
    SELECT 
      t.transaction_date, 
      t.source, 
      t.amount, 
      c.name AS category_name, 
      t.description
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = 'your-user-uuid-here' 
    AND t.type = 'expense'
    ORDER BY t.transaction_date DESC;
    `;
    res.json(expenses);
  } catch(err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}