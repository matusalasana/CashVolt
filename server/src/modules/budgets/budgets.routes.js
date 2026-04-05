import express from "express";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} from "./budgets.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBudgets);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

export default router;