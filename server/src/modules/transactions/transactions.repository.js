import { sql } from "../../config/db.js";

// GET ALL with type
export const getTransactionsRepoWithType = async (type, user_id) => {
  return await sql`
    SELECT t.*, 
           a.name AS account_name,
           c.name AS category_name
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user_id} AND t.type=${type}
    ORDER BY t.transaction_date DESC;
  `;
};

// GET ALL without type
export const getTransactionsRepoWithoutType = async (user_id) => {
  return await sql`
    SELECT t.*, 
           a.name AS account_name,
           c.name AS category_name
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user_id}
    ORDER BY t.transaction_date DESC;
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
    transaction_date
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

// DELETE
export const deleteTransactionRepo = async (id, user_id) => {
  return await sql`
    DELETE FROM transactions
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};