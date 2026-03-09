import useIncomeStore from "./incomeStore";
import useExpenseStore from "./expenseStore";
import useSavingsStore from "./savingsStore";

const useDerivedStats = () => {
  // Pull persistent values from the new Savings Store
  const savings = useSavingsStore((state) => state.savings);
  const goal = useSavingsStore((state) => state.goal);
  const setSavings = useSavingsStore((state) => state.setSavings);
  const setGoal = useSavingsStore((state) => state.setGoal);

  // Pull from existing stores
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const totalExpense = useExpenseStore((state) => state.totalExpense);

  // Derived Calculations
  const progressPercentage = goal > 0 ? (savings / goal) * 100 : 0;
  const availableBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (availableBalance / totalIncome) * 100 : 0;

  return {
    // Actions
    handleAddGoal: setGoal,
    handleAddSaving: setSavings,
    
    // Values
    saving: savings,
    goal: goal,
    progress: Math.round(progressPercentage),
    totalIncome,
    totalExpense,
    availableBalance,
    savingsRate: Math.round(savingsRate)
  };
};

export default useDerivedStats;
