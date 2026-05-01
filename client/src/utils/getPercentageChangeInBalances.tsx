type Overview = {
  total_income: number;
  total_expense: number;
  total_budget: number;
  total_savings: number;

  last_month_income: number;
  last_month_expense: number;
  last_month_savings: number;
  last_month_budget: number;
};

type BalancesOverviewProps = {
  overview?: Overview;
}

const calcPercentageChange = (current: number, last: number) => {
  if (last === 0) {
    if (current === 0) return 0;
    return 100; 
  }

  return (Math.round(((current - last) / last) * 100));
};

export const getPercentageChangeInBalances = (prop: BalancesOverviewProps) => {
  
  const overview = prop.overview;
  
  if (!overview) return null;

  const currentIncome = overview.total_income;
  const currentExpense = overview.total_expense;
  const currentSavings = overview.total_savings;
  const currentBudget = overview.total_budget;

  const lastIncome = overview.last_month_income;
  const lastExpense = overview.last_month_expense;
  const lastSavings = overview.last_month_savings;
  const lastBudget = overview.last_month_budget;

  const currentBalance = currentIncome - currentExpense;
  const lastBalance = lastIncome - lastExpense;

  return {
    percentageChangeInBalance: calcPercentageChange(currentBalance, lastBalance),
    percentageChangeInIncome: calcPercentageChange(currentIncome, lastIncome),
    percentageChangeInExpense: calcPercentageChange(currentExpense, lastExpense),
    percentageChangeInSavings: calcPercentageChange(currentSavings, lastSavings),
    percentageChangeInBudget: calcPercentageChange(currentBudget, lastBudget),
  };
};