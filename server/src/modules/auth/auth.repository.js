import { sql } from "../../config/db.js";

export const findUserByEmail = async (email) => {
  return await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
};

export const createUser = async (data) => {
  return await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${data.password})
    RETURNING id, first_name, last_name, email, role
  `;
};

export const findUserById = async (id) => {
  return await sql`
    SELECT id, first_name, last_name, email, role
    FROM users
    WHERE id = ${id}
  `;
};