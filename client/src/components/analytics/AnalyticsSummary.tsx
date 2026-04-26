import { Wallet, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth"

type AnalyticsSummaryProps = {
  summary: {
    totalBudget: number;
    totalSpent: number;
    totalRemaining: number;
    overBudgetCount: number;
    onTrackCount: number;
  };
};

const AnalyticsSummary = ({ summary }: AnalyticsSummaryProps) => {
  const {
    totalBudget,
    totalSpent,
    totalRemaining,
    overBudgetCount,
    onTrackCount,
  } = summary;
  
  const { data: user } = useAuth(); 
  const currency = user.currency;


  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Budget Card */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70">Total Budget</p>
              <p className="text-2xl font-bold text-primary">
                {Number(totalBudget).toLocaleString()} <span className="text-sm font-normal">{currency}</span>
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
                {Number(totalSpent).toLocaleString()} <span className="text-sm font-normal">{currency}</span>
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
                {Number(totalRemaining) < 0 ? 0 : Number(totalRemaining).toLocaleString()} <span className="text-sm font-normal">{currency}</span>
              </p>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
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