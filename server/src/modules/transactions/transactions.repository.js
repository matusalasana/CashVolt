import { sql } from "../config/db.js";

// GET ALL
export const getTransactionsRepo = async (user_id, type) => {
  if (type) {
    return await sql`
      SELECT 
        t.id,
        t.amount,
        t.description,
        t.account_id,
        t.category_id,
        t.transaction_date,
        a.name AS account_name,
        c.name AS category_name,
        c.type AS transaction_type
      FROM transactions t 
      LEFT JOIN accounts a ON t.account_id = a.id 
      LEFT JOIN categories c ON t.category_id = c.id 
      WHERE t.user_id = ${user_id} AND c.type = ${type}
    `;
  }

  return await sql`
    SELECT 
      t.id,
      t.amount,
      t.description,
      t.account_id,
      t.category_id,
      t.transaction_date,
      a.name AS account_name,
      c.name AS category_name,
      c.type AS transaction_type
    FROM transactions t 
    LEFT JOIN accounts a ON t.account_id = a.id 
    LEFT JOIN categories c ON t.category_id = c.id 
    WHERE t.user_id = ${user_id}
  `;
};

// CREATE
export const createTransactionRepo = async (data) => {
  return await sql`
    INSERT INTO transactions (
      amount, description, user_id, account_id, category_id, transaction_date
    )
    VALUES (
      ${data.amount},
      ${data.description},
      ${data.user_id},
      ${data.account_id},
      ${data.category_id},
      ${data.transaction_date}
    )
    RETURNING *;
  `;
};

// GET ONE
export const getTransactionByIdRepo = async (id, user_id) => {
  return await sql`
    SELECT * FROM transactions
    WHERE id = ${id} AND user_id = ${user_id}
  `;
};

// UPDATE
export const updateTransactionRepo = async (id, user_id, data) => {
  return await sql`
    UPDATE transactions
    SET 
      amount = ${data.amount},
      description = ${data.description},
      account_id = ${data.account_id},
      category_id = ${data.category_id},
      transaction_date = ${data.transaction_date}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};

// DELETE
export const deleteTransactionRepo = async (id, user_id) => {
  return await sql`
    DELETE FROM transactions
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};