import { Bar } from "react-chartjs-2";
import { chartColors, barOptions } from "../../utils/chart";
import RectangularLoadingSkeleton from "../RectangularLoadingSkeleton";

interface MonthlyBarChartProps {
  overview: {
    total_income: number;
    total_expense: number;
  };
  isLoading: boolean;
}

const MonthlyBarChart = ({ overview, isLoading }: MonthlyBarChartProps) => {
  
  const income = Number(overview?.total_income ?? 0);
  const expense = Number(overview?.total_expense ?? 0);
  
  if(isLoading){
    return <RectangularLoadingSkeleton amount={1} height={40} />;
  }
  
  if (!overview || (income === 0 && expense === 0)) {
    return null;
  }

  return (
    <div className=" card bg-base-100 shadow-xl p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        Monthly Income vs Expense Overview 
      </h2>
      <div className="h-full">
        <Bar
          data={{
            labels: ["Income", "Expense"],
            datasets: [
              {
                label: "Amount",
                data: [
                  overview.total_income,
                  overview.total_expense,
                ],
                backgroundColor: [
                  chartColors.income,
                  chartColors.expense
                ],
                borderRadius: 8,
              },
            ],
          }}
          options={{
            ...barOptions,
            maintainAspectRatio: false,
            plugins: {
              ...barOptions.plugins,
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyBarChart;