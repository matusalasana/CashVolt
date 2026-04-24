import { sql } from "../../config/db.js";

export const getCategoriesRepo = async (user_id, type = null) => {
  if (type) {
    return await sql`
      SELECT * FROM categories
      WHERE user_id = ${user_id} AND type = ${type}
      ORDER BY created_at DESC
    `;
  }
  return await sql`
    SELECT * FROM categories
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
  `;
};

// CREATE
export const createCategoryRepo = async (name, type, user_id ) => {
  const result = await sql`
    INSERT INTO categories (name, type, user_id)
    VALUES (${name}, ${type}, ${user_id})
    RETURNING *;
  `;
  return result[0];
};

// UPDATE
export const updateCategoryRepo = async ( id, data, user_id ) => {
  const { name, type } = data
  const result = await sql`
    UPDATE categories
    SET 
      name=${name},
      type=${type}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0];
};

// DELETE
export const deleteCategoryRepo = async (id, user_id ) => {
  const result = await sql`
    DELETE FROM categories
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};