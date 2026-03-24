import { sql } from "../config/db.js";

const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await sql`
      SELECT * FROM accounts 
      WHERE user_id = ${TEST_USER_ID}
    `;
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};
