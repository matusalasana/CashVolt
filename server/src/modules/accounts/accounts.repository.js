import { sql } from "../../config/db.js";

// GET ALL
export const getAccountsRepo = async (user_id) => {
  const result = await sql`
    SELECT 
      a.*,
      COALESCE(
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) - 
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 
        0
      ) AS available_balance,

      (
        SELECT t2.amount
        FROM transactions t2
        WHERE t2.account_id = a.id
        ORDER BY t2.created_at DESC
        LIMIT 1
      ) AS recent_transaction_amount,
      
      (
        SELECT t2.type
        FROM transactions t2
        WHERE t2.account_id = a.id
        ORDER BY t2.created_at DESC
        LIMIT 1
      ) AS recent_transaction_type

    FROM accounts a
    LEFT JOIN transactions t 
      ON a.id = t.account_id
    WHERE a.user_id = ${user_id}
    GROUP BY a.id
    ORDER BY a.created_at DESC
  `;

  return result;
};


// CREATE
export const createAccountRepo = async (name, user_id) => {
  const result = await sql`
    INSERT INTO accounts (name, user_id)
    VALUES (${name}, ${user_id})
    RETURNING *;
  `;
  return result[0]
};

// UPDATE
export const updateAccountRepo = async (id, name, user_id) => {
  const result = await sql`
    UPDATE accounts
    SET name = ${name}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// DELETE
export const deleteAccountRepo = async (id, user_id) => {
  const result =  await sql`
    DELETE FROM accounts
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// Helper
export const findAccountByIdRepo = async (id, user_id) => {
  const result = await sql`
    SELECT * FROM accounts WHERE id = ${id} AND user_id = ${user_id}
  `;
  return result[0];
};