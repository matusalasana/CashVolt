import { sql } from "../config/db.js";
const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000";

export const getCategories = async (req, res) => {
  try {
    const categories = await sql`
      SELECT * FROM categories
      WHERE user_id = ${TEST_USER_ID}
    `;
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
