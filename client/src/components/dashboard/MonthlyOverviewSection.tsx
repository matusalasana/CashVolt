import OverviewAnalyticsCard from "./OverviewAnalyticsCard";
import MonthlyBarChart from "./MonthlyBarChart";

const MonthlyOverviewSection = ({ overviews, monthName, year }) => {
  return (
    <>
        <div className="space-y-6">
          <OverviewAnalyticsCard
            total_balance={overviews.total_balance}
            total_income={overviews.total_income}
            total_expense={overviews.total_expense}
            total_budget={overviews.total_budget}
          />

          <MonthlyBarChart
            overview={overviews}
            monthName={monthName}
            year={year}
          />
        </div>

    </>
  );
};

export default MonthlyOverviewSection;