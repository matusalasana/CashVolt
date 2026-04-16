
import { 
  getBudgetAnalytics,
  getOverviewAnalytics,
  getYearlyAnalytics
} from "../api/analytics"
import { 
  useQuery } from "@tanstack/react-query";

export const useBudgetAnalytics = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ["budget-analytics", month, year],
    queryFn: () => getBudgetAnalytics(month, year),
    enabled: month != null && year != null,
  });
};

export const useOverviewAnalytics = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ["overview-analytics", month, year],
    queryFn: () => getOverviewAnalytics(month, year),
    enabled: month != null && year != null,
  });
};

export const useYearlyAnalytics = (year?: number) => {
  return useQuery({
    queryKey: ["yearly-analytics", year],
    queryFn: () => getYearlyAnalytics(year),
    enabled: year != null,
  });
};