import { sql } from "../config/db.js";

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const user_id = req.user.userId;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const categories = await sql`
      SELECT * FROM categories 
      WHERE user_id = ${Number(user_id)}
    `;

  if (categories.length === 0) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json(categories);
  } catch (err) {
    console.log("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// GET SINGLE CATEGORY
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const category = await sql`
      SELECT * FROM categories 
      WHERE id = ${id} AND user_id = ${Number(user_id)}
    `;

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category[0]);
  } catch (err) {
    console.log("Error getting category:", err);
    res.status(500).json({ message: "Error getting category" });
  }
};

// CREATE CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const user_id = req.user.userId;

    const newCategory = await sql`
      INSERT INTO categories (name, type, user_id)
      VALUES (${name}, ${type}, ${user_id})
      RETURNING *
    `;

    res.status(201).json(newCategory[0]);
  } catch (err) {
    console.log("Error adding category:", err);
    res.status(500).json({ message: "Error adding category" });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user_id = req.user.userId;

    const updatedCategory = await sql`
      UPDATE categories 
      SET name = ${name}
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *
    `;

    if (updatedCategory.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory[0]);
  } catch (err) {
    console.log("Error updating category:", err);
    res.status(500).json({ message: "Error updating category" });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.userId;

    const deletedCategory = await sql`
      DELETE FROM categories 
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *
    `;

    if (deletedCategory.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.log("Error deleting category:", err);
    res.status(500).json({ message: "Error deleting category" });
  }
};