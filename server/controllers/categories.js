import { sql } from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await sql`
      SELECT * FROM categories
    `;
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
