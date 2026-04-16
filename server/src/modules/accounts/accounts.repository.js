import { sql } from "../../config/db.js";

// GET ALL
export const getAccountsRepo = async (user_id) => {
  const result = await sql`
    SELECT * FROM accounts
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
  `;
  return result
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