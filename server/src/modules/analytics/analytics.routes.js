import express from "express";
import { getBudgetAnalytics, getOverviewAnalytics, getYearlyAnalytics } from "./analytics.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/budgets", getBudgetAnalytics);
router.get("/overview", getOverviewAnalytics);
router.get("/yearly", getYearlyAnalytics);

export default router;