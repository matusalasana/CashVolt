import { sql } from "../../config/db.js";

// GET ALL budgets for user
export const getBudgetsRepo = async (user_id, month, year) => {
  return await sql`
    SELECT b.*, 
      c.name AS category_name
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    WHERE b.user_id = ${user_id}
    ${month ? sql`AND b.month = ${month}` : sql``}
    ${year ? sql`AND b.year = ${year}` : sql``}
    ORDER BY b.month DESC;
  `;
};

// CREATE budget
export const createBudgetRepo = async (data, user_id) => {
  const { category_id, amount, month, year } = data;

  const result = await sql`
    INSERT INTO budgets (user_id, category_id, amount, month, year)
    VALUES (${user_id}, ${category_id}, ${amount}, ${month}, ${year})
    RETURNING *;
  `;
  return result[0]
};

// UPDATE budget
export const updateBudgetRepo = async (id, data, user_id) => {
  const { amount } = data;

  const result = await sql`
    UPDATE budgets
    SET amount = ${amount}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// DELETE budget
export const deleteBudgetRepo = async (id, user_id) => {
  const result = await sql`
    DELETE FROM budgets
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// GET SINGLE (optional but useful)
export const getBudgetByIdRepo = async (id, user_id) => {
  const result = await sql`
    SELECT * FROM budgets
    WHERE id = ${id} AND user_id = ${user_id}
  `;

  return result[0];
};