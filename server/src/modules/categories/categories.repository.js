import { sql } from "../../config/db.js";

// GET ALL with type
export const getCategoriesRepoWithType = async (user_id, type ) => {
  return await sql`
    SELECT * FROM categories
    WHERE user_id = ${user_id}
    AND type = ${type}
    ORDER BY created_at DESC
  `;
};

// GET ALL without type
export const getCategoriesRepoWithoutType = async (user_id ) => {
  return await sql`
    SELECT * FROM categories
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
  `;
};

// CREATE
export const createCategoryRepo = async (name, type, user_id ) => {
  return await sql`
    INSERT INTO categories (name, type, user_id)
    VALUES (${name}, ${type}, ${user_id})
    RETURNING *;
  `;
};

// UPDATE (FIXED - dynamic safe update)
export const updateCategoryRepo = async ( id, fields, user_id ) => {
  return await sql`
    UPDATE categories
    SET ${sql(fields)}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};

// DELETE
export const deleteCategoryRepo = async (id, user_id ) => {
  return await sql`
    DELETE FROM categories
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
};