import { Wallet, TrendingDown, TrendingUp, PieChart, AlertTriangle, CheckCircle2 } from "lucide-react";

type AnalyticsSummaryProps = {
  summary: {
    totalBudget: number;
    totalSpent: number;
    totalRemaining: number;
    averageUtilization: number;
    overBudgetCount: number;
    onTrackCount: number;
  };
};

const AnalyticsSummary = ({ summary }: AnalyticsSummaryProps) => {
  const {
    totalBudget,
    totalSpent,
    totalRemaining,
    averageUtilization,
    overBudgetCount,
    onTrackCount,
  } = summary;

  const getUtilizationColor = () => {
    if (averageUtilization >= 90) return "text-error";
    if (averageUtilization >= 70) return "text-warning";
    return "text-success";
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Budget Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Total Budget</p>
              <p className="text-2xl font-bold text-primary">
                ETB {totalBudget.toLocaleString()}
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Total Spent Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Total Spent</p>
              <p className="text-2xl font-bold text-error">
                ETB {totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="bg-error/10 p-3 rounded-full">
              <TrendingDown className="w-6 h-6 text-error" />
            </div>
          </div>
        </div>
      </div>

      {/* Total Remaining Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Total Remaining</p>
              <p className="text-2xl font-bold text-success">
                ETB {totalRemaining.toLocaleString()}
              </p>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Average Utilization Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Average Utilization</p>
              <p className={`text-2xl font-bold ${getUtilizationColor()}`}>
                {averageUtilization}%
              </p>
            </div>
            <div className="bg-info/10 p-3 rounded-full">
              <PieChart className="w-6 h-6 text-info" />
            </div>
          </div>
          <progress
            className={`progress w-full mt-2 ${
              averageUtilization >= 90
                ? "progress-error"
                : averageUtilization >= 70
                ? "progress-warning"
                : "progress-success"
            }`}
            value={averageUtilization}
            max="100"
          />
        </div>
      </div>

      {/* Over Budget Count Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Over Budget Categories</p>
              <p className="text-2xl font-bold text-error">
                {overBudgetCount}
              </p>
            </div>
            <div className="bg-error/10 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-error" />
            </div>
          </div>
        </div>
      </div>

      {/* On Track Count Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">On Track Categories</p>
              <p className="text-2xl font-bold text-success">
                {onTrackCount}
              </p>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;