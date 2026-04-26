import WelcomeUserCard from "../components/dashboard/WelcomeUserCard";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import { useOverviewAnalytics, useYearlyAnalytics } from "../hooks/useAnalytics";
import { useAuth } from "../hooks/useAuth";
import DashboardLoader from "../components/dashboard/DashboardLoader";
import MonthlyOverviewSection from "../components/dashboard/MonthlyOverviewSection";
import YearlyOverviewChart from "../components/dashboard/YearlyOverviewChart";
import { Helmet } from 'react-helmet-async';


const monthsOfTheYear = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Dashboard = () => {
  const { data: overviews, isLoading: monthlyDataLoading } =
    useOverviewAnalytics(currentMonth, currentYear);

  const { data: yearlyData, isLoading: yearlyDataLoading } =
    useYearlyAnalytics(currentYear);

  const { data: user, isLoading: userLoading } = useAuth();

  const getYearlyChart = (data: any[]) => {
    const fullYear = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const index = Number(item.month) - 1;
        fullYear[index] = {
          month: Number(item.month),
          income: Number(item.total_income) || 0,
          expense: Number(item.total_expense) || 0,
        };
      });
    }

    return {
      income: fullYear.map((m) => m.income),
      expenses: fullYear.map((m) => m.expense),
    };
  };

  if (monthlyDataLoading || yearlyDataLoading || userLoading || !user) {
    return <DashboardLoader />;
  }

  const chart = getYearlyChart(yearlyData);

  return (
  <>
    <Helmet>
      <title>Dashboard | Cash Volt</title>
    </Helmet>
    <div className="p-6 space-y-8">
      <WelcomeUserCard
        name={user.first_name}
        monthName={monthsOfTheYear[currentMonth - 1]}
        year={currentYear}
      />

      <MonthlyOverviewSection
        overviews={overviews}
        monthName={monthsOfTheYear[currentMonth - 1]}
        year={currentYear}
      />

      <YearlyOverviewChart
        chart={chart}
        labels={monthsOfTheYear}
        year={currentYear}
      />

      <CategoryPieChart />
    </div>
  </>
  );
};

export default Dashboard;