import API from "./api";

export const getBudgetAnalytics = async (month?: number, year?: number) => {
  const res = await API.get("/analytics/budgets", {
    params: {month, year}
  });
  return res.data;
};

export const getOverviewAnalytics = async (month?: number, year?: number) => {
  const res = await API.get("/analytics/overview", {
    params: {month, year}
  });
  return res.data;
};

export const getYearlyAnalytics = async (year?: number) => {
  const res = await API.get("/analytics/yearly", {
    params: {year}
  });
  return res.data;
};