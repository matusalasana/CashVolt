import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Bitcoin,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface OverviewAnalyticsProps {
  total_balance: number;
  total_income: number;
  total_expense: number;
  total_budget: number;
  total_savings: number;
}

const OverviewAnalyticsCard = ({
  total_balance,
  total_income,
  total_expense,
  total_savings,
  total_budget,
}: OverviewAnalyticsProps) => {
  const { data: user } = useAuth();
  const currency = user?.currency || "ETB";

  const metrics = [
    {
      label: "Available Balance",
      value: total_balance,
      icon: Wallet,
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Remaining amount",
    },
    {
      label: "Income",
      value: total_income,
      icon: TrendingUp,
      color: "from-emerald-500 to-green-400",
      textColor: "text-emerald-600 dark:text-emerald-400",
      description: "Money earned",
    },
    {
      label: "Expense",
      value: total_expense,
      icon: TrendingDown,
      color: "from-rose-300 to-rose-500",
      textColor: "text-rose-700 dark:text-rose-500",
      description: "Money spent",
    },
    {
      label: "Savings",
      value: total_savings,
      icon: PiggyBank,
      color: "from-amber-200 to-orange-400",
      textColor: "text-amber-700 dark:text-amber-500",
      description: "Money saved",
    },
    {
      label: "Budget",
      value: total_budget,
      icon: Bitcoin,
      color: "from-blue-200 to-blue-400",
      textColor: "text-blue-700 dark:text-blue-500",
      description: "Planned limit",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 p-4">
  {metrics.map((metric, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-base-100/40 border border-base-300 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-base-100/60"
    >
      {/* Glass gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity`}
      />

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-base-300/50" />

      <div className="relative p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-2 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-10 backdrop-blur-sm`}
          >
            <metric.icon
              size={20}
              className={`${metric.textColor} md:w-5 md:h-5`}
              strokeWidth={1.5}
            />
          </div>

          <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
            {metric.label}
          </span>
        </div>

        {/* Value */}
        <div className="mb-2">
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content">
            {Number(metric.value).toLocaleString()}
            <span className="text-sm md:text-base font-normal text-base-content/60 ml-1">
              {currency}
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-base-content/60 font-medium">
          {metric.description}
        </p>

        {/* Decorative line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </div>
    </div>
  ))}
</div>
  );
};

export default OverviewAnalyticsCard;