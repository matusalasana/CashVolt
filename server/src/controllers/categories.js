import { sql } from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await sql`
      SELECT * FROM categories
    `;
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategory = async ( req, res ) => {
  
}

export const addCategory = async ( req, res ) => {
  
}

export const updateCategory = async ( req, res ) => {
  
}

export const deleteCategory = async ( req, res ) => {
  
}
