import { Line } from "react-chartjs-2";
import { chartColors } from "../../utils/chart";
import RectangularLoadingSkeleton from "../RectangularLoadingSkeleton";

interface WeeklyLineChartProps {
  data: any[];
  isLoading: boolean;
}

const WeeklyLineChart = ({
  data,
  isLoading
}: WeeklyLineChartProps) => {
  
  if (isLoading) {
    return (
      <RectangularLoadingSkeleton 
        amount={1} 
        height="h-80"
      />
    );
  }
  
  const getWeeklyData = (data: any[] = []) => {
    const today = new Date();
  
    const expenses: number[] = [];
    const income: number[] = [];
    const formattedDays: string[] = [];
  
    // Normalize backend data
    const dataMap = new Map(
      data?.map(item => [
        item.day?.trim().toLowerCase(),
        {
          income: item.income ?? 0,
          expense: item.expense ?? 0
        }
      ])
    );
  
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
  
      const dayName = d
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
  
      const shortDay = d.toLocaleDateString("en-US", { weekday: "short" });
  
      const dayData = dataMap.get(dayName);
  
      formattedDays.push(shortDay);
      income.push(dayData?.income ?? 0);
      expenses.push(dayData?.expense ?? 0);
    }
  
    return { days: formattedDays, expenses, income };
  };
  
  const { days, expenses, income } = getWeeklyData(data);
  
  const hasExpense = expenses?.some(d => d > 0) ?? false;
  const hasIncome = income?.some(d => d > 0) ?? false;
  const hasData = hasIncome || hasExpense;
  
  if (!hasData) {
    return null; 
  }
  

  return (
    <div className="card bg-base-100 shadow-xl p-6 h-[350px]">
      <h2 className="text-xl text-center font-bold mb-4">
        Last 7 days Overview
      </h2>

      <div className="h-full">
        <Line
          data={{
            labels: days,
            datasets: [
              {
                label: "Income",
                data: income,
                borderColor: chartColors.income,
                backgroundColor: chartColors.income + "20",
                tension: 0.4,
              },
              {
                label: "Expense",
                data: expenses,
                borderColor: chartColors.expense,
                backgroundColor: chartColors.expense + "20",
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom" },
            },
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WeeklyLineChart;