import { sql } from "../../config/db.js";

export const registerUserRepo = async (
  first_name,
  last_name,
  email,
  password
) => {

  try {
    await sql`BEGIN`;

    // 1. Register user
    const userResult = await sql
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES (${first_name}, ${last_name}, ${email}, ${password})
       RETURNING id, first_name, last_name, email, role`

    const user = userResult[0];

    // 2. Create default accounts
    await sql
      `INSERT INTO accounts (name, user_id)
       VALUES 
        ('Bank', ${user.id}),
        ('Cash', ${user.id})
      `;

    // 3. Create default categories
    await sql
      `INSERT INTO categories (name, type, user_id)
       VALUES 
        ('Food', 'expense', ${user.id}),
        ('Transportation', 'expense', ${user.id}),
        ('Salary', 'income', ${user.id})`

    await sql`COMMIT`

    return user;
    
  } catch (err) {
    await sql`ROLLBACK`
    throw err;
  }
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

// HELPERS 
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