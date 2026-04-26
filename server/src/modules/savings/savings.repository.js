import { sql } from "../../config/db.js";


// GET ALL
export const getSavingsRepo = async (user_id) => {
  return await sql`
    SELECT 
      s.*,
      due_date - CURRENT_DATE AS days_left,
      COALESCE(SUM(t.amount), 0) AS current_amount
    FROM savings s
    LEFT JOIN transactions t 
      ON t.savings_id = s.id
    WHERE s.user_id = ${user_id}
    GROUP BY s.id
    ORDER BY s.created_at DESC;
  `;
};


// GET ONE
export const getSingleSavingsRepo = async (id, user_id) => {
  const result = await sql`
    SELECT *
    FROM savings
    WHERE id = ${id} AND user_id = ${user_id}
  `;

  return result[0];
};


// CREATE
export const createSavingsRepo = async (
  title,
  target_amount,
  due_date,
  user_id
) => {
  const result = await sql`
    INSERT INTO savings (title, target_amount, due_date, user_id)
    VALUES (${title}, ${target_amount}, ${due_date}, ${user_id})
    RETURNING *;
  `;

  return result;
};


// UPDATE (partial update 🔥)
export const updateSavingsRepo = async (id, data, user_id) => {
  const { title, target_amount, due_date } = data;

  const result = await sql`
    UPDATE savings
    SET
      title = COALESCE(${title}, title),
      target_amount = COALESCE(${target_amount}, target_amount),
      due_date = COALESCE(${due_date}, due_date),
      updated_at = NOW()
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;

  return result[0];
};


// DELETE
export const deleteSavingsRepo = async (id, user_id) => {
  const result = await sql`
    DELETE FROM savings
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;

  return result[0];
};