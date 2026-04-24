import { sql } from "../../config/db.js";

// GET ALL (exclude sensitive data)
export const getUsersRepo = async () => {
  const result = await sql`
    SELECT id, first_name, last_name, email, profile_picture, role, created_at, updated_at
    FROM users 
    ORDER BY first_name
  `;
  return result;
};

// GET BY ID
export const getUserByIdRepo = async (user_id) => {
  const result = await sql`
    SELECT id, first_name, last_name, email, profile_picture, password, role, created_at, updated_at
    FROM users 
    WHERE id = ${user_id}
  `;
  return result[0];
};

// UPDATE (dynamic fields)
export const updateUserRepo = async (updates, user_id) => {
  const setClauses = [];
  const values = [];
  let idx = 1;
  
  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${idx++}`);
    values.push(value);
  }
  values.push(user_id);
  
  const query = `
    UPDATE users 
    SET ${setClauses.join(', ')}, updated_at = NOW()
    WHERE id = $${idx}
    RETURNING id, first_name, last_name, email, profile_picture, role, created_at, updated_at;
  `;
  
  const result = await sql.query(query, values);
  return result[0];
};

// UPDATE PASSWORD ONLY
export const updatePasswordRepo = async (user_id, hashedPassword) => {
  const result = await sql`
    UPDATE users 
    SET password = ${hashedPassword}, updated_at = NOW()
    WHERE id = ${user_id}
    RETURNING id;
  `;
  return result[0];
};

// DELETE
export const deleteUserRepo = async (user_id) => {
  const result = await sql`
    DELETE FROM users 
    WHERE id = ${user_id} 
    RETURNING id;
  `;
  return result[0];
};