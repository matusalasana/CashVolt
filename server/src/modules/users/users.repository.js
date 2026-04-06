import { sql } from "../../config/db.js"

// GET ALL
export const getUsersRepo = async () => {
  return await sql` SELECT * FROM users ORDER BY first_name`;
};

// UPDATE
export const updateUserRepo = async (first_name, last_name, email, password, profile_picture, user_id) => {
  return await sql`
    UPDATE users 
    SET 
      first_name = ${first_name},
      last_name = ${last_name},
      email = ${email},
      password = ${password},
      profile_picture = ${profile_picture}
    WHERE id = ${user_id}
    RETURNING *;
  `;
};

// DELETE
export const deleteUserRepo = async (user_id) => {
  return await sql`
    DELETE FROM users WHERE id = ${user_id} RETURNING *;
  `;
};