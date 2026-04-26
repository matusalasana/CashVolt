import { sql } from "../../config/db.js";

// GET
export const getTransactionsRepo = async (
  user_id,
  type,
  safeSort,
  safeOrder, 
  limit = 10,
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
    ORDER BY ${sql.unsafe(safeSort)} ${sql.unsafe(safeOrder)}
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
    savings_id
  } = data;

  const result = await sql`
    INSERT INTO transactions (
      amount,
      type,
      description,
      account_id,
      category_id,
      transaction_date,
      user_id,
      savings_id
    )
    VALUES (
      ${amount},
      ${type},
      ${description},
      ${account_id},
      ${category_id},
      ${transaction_date},
      ${user_id},
      ${savings_id}
    )
    RETURNING *;
  `;
  return result[0];
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
    savings_id,
  } = data;

  const result = await sql`
    UPDATE transactions
    SET 
      amount = ${amount},
      type = ${type},
      description = ${description},
      account_id = ${account_id},
      category_id = ${category_id},
      transaction_date = ${transaction_date},
      savings_id=${savings_id}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0];
};

// DELETE
export const deleteTransactionRepo = async (id, user_id) => {
  const result = await sql`
    DELETE FROM transactions
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// VALIDATION HELPERS
export const getAccountById = async (id, user_id) => {
  const account = await sql`
    SELECT * FROM accounts 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
  return account[0];
};

export const getCategoryById = async (id, user_id) => {
  const category = await sql`
    SELECT * FROM categories 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
  return category[0]
};

export const getTransactionById = async (id, user_id) => {
  const transaction = await sql`
    SELECT * FROM transactions 
    WHERE id = ${id} AND user_id = ${user_id}
  `;
  return transaction[0]
};