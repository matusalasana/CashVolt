import { 
  getOverviewAnalyticsService,
  getBudgetAnalyticsService,
  getYearlyAnalyticsService
} from "./analytics.service.js";


// BUDGET ANALYTICS
export const getBudgetAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { month, year } = req.query;

    const data = await getBudgetAnalyticsService(user_id, month, year);

    return res.status(200).json(data);

  } catch (err) {
    console.log("Budget analytics error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// OVERVIEW ANALYTICS
export const getOverviewAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { month, year } = req.query;

    const data = await getOverviewAnalyticsService(user_id, month, year);

    return res.status(200).json(data);

  } catch (err) {
    console.log("Overview analytics error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// YEARLY ANALYTICS
export const getYearlyAnalytics = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { year } = req.query;

    const yearNum = Number(year);

    const data = await getYearlyAnalyticsService(user_id, yearNum);

    return res.status(200).json(data);

  } catch (err) {
    console.log("Yearly analytics error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};