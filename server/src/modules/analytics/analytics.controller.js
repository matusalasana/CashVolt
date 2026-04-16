import { 
  getOverviewAnalyticsService,
  getBudgetAnalyticsService,
  getYearlyAnalyticsService
} from "./analytics.service.js";

export const getBudgetAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { month, year } = req.query;
    const data = await getBudgetAnalyticsService(user_id, month, year)
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getOverviewAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { month, year } = req.query;
    const data = await getOverviewAnalyticsService(user_id, month, year)
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getYearlyAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { year } = req.query;
    const yearNum = Number(year);
    const data = await getYearlyAnalyticsService(user_id, yearNum)
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};