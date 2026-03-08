import useIncomeStore from "./incomeStore";
import useExpenseStore from "./expenseStore";


const useDerivedStats = () => {
  
  const saving = 1000
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const totalExpense = useExpenseStore((state) => state.totalExpense);

  
  // Calculate savings percentage or other metrics here if needed
  const availableBalance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return {
    saving,
    totalIncome,
    totalExpense,
    availableBalance,
    savingsRate: Math.round(savingsRate)
  };
};

export default useDerivedStats;