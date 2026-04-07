import { sql } from "../../config/db.js";

// GET
export const getTransactionsRepo = async (
  user_id,
  type,
  limit = 20,
  offset = 0,
) => {
  return await sql`
    SELECT t.*, 
           a.name AS account_name,
           c.name AS category_name
    FROM transactions t
    LEFT JOIN accounts a ON t.account_id = a.id
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user_id}
    ${type ? sql`AND t.type = ${type}` : sql``}
    ORDER BY t.transaction_date DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `;
};

// CREATE
export const createTransactionRepo = async (data, user_id) => {
  const {
    amount,
    type,
    description,
    account_id,
    category_id,
    transaction_date,
  } = data;

  return await sql`
    INSERT INTO transactions (
      amount,
      type,
      description,
      account_id,
      category_id,
      transaction_date,
      user_id
    )
    VALUES (
      ${amount},
      ${type},
      ${description},
      ${account_id},
      ${category_id},
      ${transaction_date},
      ${user_id}
    )
    RETURNING *;
  `;
};

// UPDATE
export const updateTransactionRepo = async (id, data, user_id) => {
  const {
    amount,
    type,
    description,
    account_id,
    category_id,
    transaction_date,
  } = data;

  return await sql`
    UPDATE transactions
    SET 
      amount = ${amount},
      type = ${type},
      description = ${description},
      account_id = ${account_id},
      category_id = ${category_id},
      transaction_date = ${transaction_date}
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

// VALIDATION HELPERS
export const getAccountById = async (id, user_id) => {
  return await sql`
    SELECT * FROM accounts 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
};

export const getCategoryById = async (id, user_id) => {
  return await sql`
    SELECT * FROM categories 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
};

export const getTransactionById = async (id, user_id) => {
  return await sql`
    SELECT * FROM transactions 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
};