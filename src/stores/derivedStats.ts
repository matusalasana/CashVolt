import useIncomeStore from "./incomeStore";
import useExpenseStore from "./expenseStore";
import {useState} from "react"


const useDerivedStats = () => {
  
  const [savings, setSavings] = useState<number>(0)
  const [goalAmount, setGoalAmount] = useState<number>(0)
  
  const saving = savings
  
  const handleAddSaving = (val: number) => {
    setSavings(val)
  }
  const handleAddGoal = (val: number) => {
    setGoalAmount(val)
  }
  const goal = goalAmount
  const progressPercentage = (saving/goal)*100
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const totalExpense = useExpenseStore((state) => state.totalExpense);

  
  // Calculate savings percentage or other metrics here if needed
  const progress = Math.round(progressPercentage)
  const availableBalance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return {
    handleAddGoal,
    handleAddSaving,
    progress,
    goal,
    saving,
    totalIncome,
    totalExpense,
    availableBalance,
    savingsRate: Math.round(savingsRate)
  };
};

export default useDerivedStats;