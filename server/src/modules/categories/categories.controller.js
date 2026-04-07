import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService
} from "./categories.service.js";

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const user_id = req.user.userId
    const data = await getCategoriesService(
      user_id,
      type
    );
    console.log(user_id)

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE
export const createCategory = async (req, res) => {
  try {
    const data = await createCategoryService(
      req.body,
      req.user.userId
    );

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await updateCategoryService(
      id,
      req.body,
      req.user.userId
    );

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteCategoryService(
      id,
      req.user.userId
    );

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};