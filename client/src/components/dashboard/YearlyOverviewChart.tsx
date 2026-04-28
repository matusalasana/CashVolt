import { Line } from "react-chartjs-2";
import { chartColors } from "../../utils/chart";
import RectangularLoadingSkeleton from "../RectangularLoadingSkeleton";

interface YearlyOverviewChartProps {
  data: any[];
  months: string[];
  year: number;
  isLoading: boolean;
}

const YearlyOverviewChart = ({
  data,
  months,
  year,
  isLoading,
}: YearlyOverviewChartProps) => {
  
  const currentMonth = new Date().getMonth() + 1;

  const getYearlyChart = (data: any[] = []) => {
    // Create full 12 months structure with zero values
    const fullYear = Array.from({ length: currentMonth }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    // Populate with actual data where available
    data.forEach((item) => {
      const index = Number(item.month) - 1;

      if (index >= 0 && index < 12) {
        fullYear[index] = {
          month: index + 1,
          income: Number(item.total_income) || 0,
          expense: Number(item.total_expense) || 0,
        };
      }
    });

    // Extract separate arrays for chart consumption
    return {
      income: fullYear.map((d) => d.income),
      expense: fullYear.map((d) => d.expense),
    };
  };

  const chart = getYearlyChart(data);
  
  // Get months only up to current month
  const monthsUptoNow = months.slice(0, currentMonth).map(m => m);

  // Check if there's any data to display
  const hasData =
    chart.income.some((v) => v > 0) ||
    chart.expense.some((v) => v > 0);

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return <RectangularLoadingSkeleton amount={1} height={40} />;
  }

  // Don't render anything if no data exists
  if (!hasData) return null;

  return (
    <div className="card bg-base-100 shadow-xl p-6 h-[350px]">
      <h2 className="text-xl text-center font-bold mb-4">
        {year} Overview
      </h2>

      <div className="h-full">
        <Line
          data={{
            labels: monthsUptoNow,
            datasets: [
              {
                label: "Income",
                data: chart.income,
                borderColor: chartColors.income,
                backgroundColor: chartColors.income + "20",
                tension: 0.4,
              },
              {
                label: "Expense",
                data: chart.expense,
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

export default YearlyOverviewChart;