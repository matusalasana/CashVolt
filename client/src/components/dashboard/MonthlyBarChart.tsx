import { Bar } from "react-chartjs-2";
import { chartColors, barOptions } from "../../utils/chart";

interface MonthlyBarChartProps {
  overview: {
    total_income: number;
    total_expense: number;
  };
  monthName: string;
  year: number;
}

const MonthlyBarChart = ({ overview, monthName, year }: MonthlyBarChartProps) => {
  
  if (!overview || !monthName || !year) {
    return <div className="skeleton h-[350px]" />;
  }

  return (
    <div className=" card bg-base-100 shadow-xl p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        {monthName}, {year} Income vs Expense Overview 
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