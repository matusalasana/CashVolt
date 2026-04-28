import WelcomeUserCard from "../components/dashboard/WelcomeUserCard";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import { useOverviewAnalytics, useYearlyAnalytics } from "../hooks/useAnalytics";
import { useAuth } from "../hooks/useAuth";
import { useBudgets } from "../hooks/useBudgets";
import BalancesOverview from "../components/dashboard/BalancesOverview";
import YearlyOverviewChart from "../components/dashboard/YearlyOverviewChart";
import MonthlyBarChart from "../components/dashboard/MonthlyBarChart"
import RecentTransactions from "../components/dashboard/RecentTransactions";
import CategorySpentCard from "../components/dashboard/CategorySpentCard";
import { Helmet } from 'react-helmet-async';


const monthsOfTheYear = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Dashboard = () => {
  
  const { data: overview, isLoading: monthlyDataLoading } =
    useOverviewAnalytics(currentMonth, currentYear);
  const { data: budgets, isLoading: budgetsLoading } =
    useBudgets(currentMonth, currentYear);
  const { data: yearlyData, isLoading: yearlyDataLoading } =
    useYearlyAnalytics(currentYear);
  const { data: user, isLoading: userLoading } = useAuth();

  return (
  <>
    <Helmet>
      <title>Dashboard | Cash Volt</title>
    </Helmet>
    <div className="p-6 space-y-8">
      <WelcomeUserCard
        name={user?.first_name || ""}
        monthName={monthsOfTheYear[currentMonth - 1]}
        year={currentYear}
        isLoading={userLoading}
      />

      <BalancesOverview
        total_balance={overview?.total_balance || 0}
        total_expense={overview?.total_expense || 0}
        total_income={overview?.total_income || 0}
        total_savings={overview?.total_savings || 0}
        total_budget={overview?.total_budget || 0}
        isLoading={monthlyDataLoading}
      />
      
      <MonthlyBarChart
       overview={overview}
       isLoading={monthlyDataLoading}
      />

      <YearlyOverviewChart
        data={yearlyData}
        months={monthsOfTheYear}
        year={currentYear}
        isLoading={yearlyDataLoading}
      />

      <CategoryPieChart 
        budgets={budgets}
        isLoading={budgetsLoading}
      />
      
      <RecentTransactions />
      <CategorySpentCard
        categories={budgets}
      />
      
    </div>
  </>
  );
};

export default Dashboard;