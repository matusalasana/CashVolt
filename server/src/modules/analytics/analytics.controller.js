import { getBudgetAnalyticsService } from "./analytics.service.js";

export const getBudgetAnalytics = async (req, res) => {
  try {
    const { month } = req.query;

    const data = await getBudgetAnalyticsService(
      req.user.userId,
      month
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};