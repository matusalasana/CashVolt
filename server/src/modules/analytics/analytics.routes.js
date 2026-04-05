import express from "express";
import { getBudgetAnalytics } from "./analytics.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

// GET /api/analytics/budgets?month=2024-04-01
router.get("/budgets", getBudgetAnalytics);

export default router;