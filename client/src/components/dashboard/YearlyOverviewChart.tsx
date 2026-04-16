import { Line } from "react-chartjs-2";
import { chartColors } from "../../utils/chart";

const YearlyOverviewChart = ({ chart, labels, year }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        {year} Overview
      </h2>

      <div className="h-full">
        <Line
          data={{
            labels,
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
                data: chart.expenses,
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