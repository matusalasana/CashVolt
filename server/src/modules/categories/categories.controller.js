import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService
} from "./categories.service.js";

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const {type} = req.query;
    const data = await getCategoriesService(req.user.userId, type);
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
    const data = await updateCategoryService(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    await deleteCategoryService(
      req.params.id,
      req.user.userId
    );

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};