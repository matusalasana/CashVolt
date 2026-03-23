import { sql } from "../config/db.js"

export const getExpenses = async (req, res) => {
  
  try {
    const expenses = await sql`
      SELECT t.*, c.name as category_name, c.color_code 
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user-id = 'user-id' AND t.type = 'expense'
      ORDER BY t.transaction_date DESC
    `;
    res.json(expenses);
  } catch(err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}






const expenses = await sql`
  SELECT 
    t.*,                   -- 1. Grab every column from the Transaction (amount, date, etc.)
    c.name as category_name, -- 2. Grab the 'name' from Categories, but call it 'category_name'
    c.color_code           -- 3. Grab the 'color_code' from Categories
  FROM transactions t
  LEFT JOIN categories c ON t.category_id = c.id -- 4. Connect the two tables
  WHERE t.user_id = ${userId} -- 5. Only show data belonging to the logged-in user
  AND t.type = 'expense'      -- 6. Filter out 'income' or 'transfers'
  ORDER BY t.transaction_date DESC -- 7. Show newest first
`;

