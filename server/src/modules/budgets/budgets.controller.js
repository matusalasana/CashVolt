import {
  getBudgetsService,
  createBudgetService,
  updateBudgetService,
  deleteBudgetService
} from "./budgets.service.js";


// GET ALL
export const getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;
    const user_id = req.user.userId;

    const parsedMonth = month ? Number(month) : undefined;
    const parsedYear = year ? Number(year) : undefined;

    const data = await getBudgetsService(
      user_id,
      parsedMonth,
      parsedYear
    );

    return res.status(200).json(data);

  } catch (err) {
    console.log("Get budgets error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// CREATE
export const createBudget = async (req, res) => {
  try {
    const data = await createBudgetService(
      req.body,
      req.user.userId
    );

    return res.status(201).json(data);

  } catch (err) {
    console.log("Create budget error:", err.message);

    return res.status(400).json({
      message: err.message
    });
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

    return res.status(200).json(data);

  } catch (err) {
    console.log("Update budget error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// DELETE
export const deleteBudget = async (req, res) => {
  try {
    await deleteBudgetService(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      message: "Budget deleted"
    });

  } catch (err) {
    console.log("Delete budget error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};