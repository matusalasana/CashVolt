import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

export const initChartConfig = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement, 
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  // Global defaults
  ChartJS.defaults.responsive = true;
  ChartJS.defaults.maintainAspectRatio = false;
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;

  // Fonts & colors
  ChartJS.defaults.color = "#9CA3AF";
  ChartJS.defaults.font.family = "Inter, sans-serif";

  // Legend
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.position = "bottom";

  // Tooltip
  ChartJS.defaults.plugins.tooltip.backgroundColor = "#111827";
  ChartJS.defaults.plugins.tooltip.titleColor = "#fff";
  ChartJS.defaults.plugins.tooltip.bodyColor = "#d1d5db";
  
};

export const chartColors = {
  income: "#22c55e",     // green
  expense: "#ef4444",    // red
  balance: "#3b82f6",    // blue
  budget: "#f59e0b",     // yellow
};

export const chartBgColors = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
];

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Income vs Expenses",
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        autoSkip: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export const pieOptions = {
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export default ChartJS;