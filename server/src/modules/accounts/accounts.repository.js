import { sql } from "../../config/db.js";

// GET ALL
export const getAccountsRepo = async (user_id) => {
  return await sql`
    SELECT * FROM accounts
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
  `;
};

// CREATE
export const createAccountRepo = async (name, user_id) => {
  return await sql`
    INSERT INTO accounts (name, user_id)
    VALUES (${name}, ${user_id})
    RETURNING *;
  `;
};

// UPDATE
export const updateAccountRepo = async (id, name, user_id) => {
  return await sql`
    UPDATE accounts
    SET name = ${name}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};

// DELETE
export const deleteAccountRepo = async (id, user_id) => {
  return await sql`
    DELETE FROM accounts
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};