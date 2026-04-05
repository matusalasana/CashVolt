import {
  getBudgetsService,
  createBudgetService,
  updateBudgetService,
  deleteBudgetService
} from "./budgets.service.js";

// GET ALL
export const getBudgets = async (req, res) => {
  try {
    const data = await getBudgetsService(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE
export const createBudget = async (req, res) => {
  try {
    const data = await createBudgetService(
      req.body,
      req.user.userId
    );

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updateBudget = async (req, res) => {
  try {
    const data = await updateBudgetService(
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
export const deleteBudget = async (req, res) => {
  try {
    await deleteBudgetService(
      req.params.id,
      req.user.userId
    );

    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};