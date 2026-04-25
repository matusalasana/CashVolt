import { sql } from "../../config/db.js";

export const registerUserRepo = async (
  first_name,
  last_name,
  email,
  password
) => {
  const result = await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${first_name}, ${last_name}, ${email}, ${password})
    RETURNING id, first_name, last_name, email, role
  `;

  return result[0];
};


export const updateUserRepo = async (data, user_id) => {
  const { first_name, last_name, email, profile_picture } = data;

  const result = await sql`
    UPDATE users 
    SET
      first_name = COALESCE(${first_name}, first_name),
      last_name = COALESCE(${last_name}, last_name),
      email = COALESCE(${email}, email),
      profile_picture = COALESCE(${profile_picture}, profile_picture)
    WHERE id = ${user_id}
    RETURNING *
  `;

  return result[0];
};

export const findUserByIdRepo = async (id) => {
  const result = await sql`
    SELECT *
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