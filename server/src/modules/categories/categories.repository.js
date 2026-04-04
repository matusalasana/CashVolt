import { sql } from "../../config/db.js";

// GET ALL
export const getCategoriesRepo = async (user_id) => {
  return await sql`
    SELECT * FROM categories
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
  `;
};

// CREATE
export const createCategoryRepo = async (name, type, user_id) => {
  return await sql`
    INSERT INTO categories (name, type, user_id)
    VALUES (${name}, ${type}, ${user_id})
    RETURNING *;
  `;
};

// UPDATE
export const updateCategoryRepo = async (id, name, type, user_id) => {
  return await sql`
    UPDATE categories
    SET name = ${name}, type = ${type}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};

// DELETE
export const deleteCategoryRepo = async (id, user_id) => {
  return await sql`
    DELETE FROM categories
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};