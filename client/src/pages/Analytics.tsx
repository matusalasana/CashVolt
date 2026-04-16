import { useState } from "react";
import { useBudgetAnalytics } from "../hooks/useAnalytics";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsFilter from "../components/analytics/AnalyticsFilter";
import AnalyticsGrid from "../components/analytics/AnalyticsCard";
import AnalyticsLoader from "../components/analytics/AnalyticsLoader";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import AnalyticsEmptyState from "../components/analytics/AnalyticsEmptyState";

// Helper to get month names
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate last 5 years and next 5 years from current year
const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

const Analytics = () => {
  // Filter states
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch analytics data
  const { data: analyticsData, isLoading } = useBudgetAnalytics(selectedMonth, selectedYear);

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!analyticsData?.length) {
      return {
        totalBudget: 0,
        totalSpent: 0,
        totalRemaining: 0,
        averageUtilization: 0,
        overBudgetCount: 0,
        onTrackCount: 0,
      };
    }

    const totalBudget = analyticsData.reduce((sum, item) => sum + item.amount, 0);
    const totalSpent = analyticsData.reduce((sum, item) => sum + item.spent, 0);
    const totalRemaining = totalBudget - totalSpent;
    const averageUtilization = totalBudget > 0 
      ? Math.round((totalSpent / totalBudget) * 100) 
      : 0;
    const overBudgetCount = analyticsData.filter(item => item.spent > item.amount).length;
    const onTrackCount = analyticsData.filter(item => item.spent <= item.amount).length;

    return {
      totalBudget,
      totalSpent,
      totalRemaining,
      averageUtilization,
      overBudgetCount,
      onTrackCount,
    };
  };

  const summary = calculateSummary();

  if (isLoading) {
    return <AnalyticsLoader />;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-base-100 space-y-6">
      {/* Header Section */}
      <AnalyticsHeader />

      {/* Filters Section */}
      <AnalyticsFilter
        month={selectedMonth}
        year={selectedYear}
        setMonth={setSelectedMonth}
        setYear={setSelectedYear}
        months={MONTHS}
        years={getYears()}
      />

      {/* Summary Cards */}
      {analyticsData && analyticsData.length > 0 && (
        <AnalyticsSummary summary={summary} />
      )}

      {/* Analytics Grid */}
      {!isLoading && analyticsData && analyticsData.length > 0 && (
        <AnalyticsGrid data={analyticsData} />
      )}

      {/* Empty State */}
      {!isLoading && (!analyticsData || analyticsData.length === 0) && (
        <AnalyticsEmptyState />
      )}
    </div>
  );
};

export default Analytics;