import OverviewAnalyticsCard from "./OverviewAnalyticsCard";
import MonthlyBarChart from "./MonthlyBarChart";

const MonthlyOverviewSection = ({ overviews, monthName, year }) => {
  return (
    <>
      {overviews?.map((overview, index) => (
        <div key={overview.id || index} className="space-y-6">
          <OverviewAnalyticsCard
            total_balance={overview.total_balance}
            total_income={overview.total_income}
            total_expense={overview.total_expense}
            total_budget={overview.total_budget}
          />

          <MonthlyBarChart
            overview={overview}
            monthName={monthName}
            year={year}
          />
        </div>
      ))}
    </>
  );
};

export default MonthlyOverviewSection;