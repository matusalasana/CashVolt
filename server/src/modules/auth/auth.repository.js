import { sql } from "../../config/db.js";

export const registerUserRepo = async (data) => {
  const result = await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${data.password})
    RETURNING id, first_name, last_name, email, role
  `;
  return result[0];
};

export const findUserByIdRepo = async (id) => {
  const result = await sql`
    SELECT id, first_name, last_name, email, role
    FROM users WHERE id = ${id}
  `;
  return result[0];
};

export const findUserByEmailRepo = async (email) => {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email.toLowerCase().trim()}
  `;
  return result[0];
};