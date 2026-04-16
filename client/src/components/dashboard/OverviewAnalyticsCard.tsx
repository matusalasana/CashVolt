import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

interface OverviewAnalyticsProps {
  total_balance: number;
  total_income: number;
  total_expense: number;
  total_budget: number;
}

const OverviewAnalyticsCard = ({
  total_balance,
  total_income,
  total_expense,
  total_budget,
}: OverviewAnalyticsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

      {/* TOTAL BALANCE */}
      <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
        <div className="card-body p-4 md:p-6">
          <div className="flex items-center gap-2 text-primary">
            <Wallet size={18} className="md:w-5 md:h-5" />
            <h2 className="font-medium md:font-semibold text-sm md:text-base">Balance</h2>
          </div>

          <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2">
            ${total_balance.toLocaleString()}
          </p>

          <p className="text-xs md:text-sm opacity-60">
            Remaining amount 
          </p>
        </div>
      </div>

      {/* TOTAL INCOME */}
      <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
        <div className="card-body p-4 md:p-6">
          <div className="flex items-center gap-2 text-success">
            <TrendingUp size={18} className="md:w-5 md:h-5" />
            <h2 className="font-medium md:font-semibold text-sm md:text-base">Income</h2>
          </div>

          <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2 text-success">
            ${total_income.toLocaleString()}
          </p>

          <p className="text-xs md:text-sm opacity-60">
            Money earned
          </p>
        </div>
      </div>

      {/* TOTAL EXPENSE */}
      <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
        <div className="card-body p-4 md:p-6">
          <div className="flex items-center gap-2 text-error">
            <TrendingDown size={18} className="md:w-5 md:h-5" />
            <h2 className="font-medium md:font-semibold text-sm md:text-base">Expense</h2>
          </div>

          <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2 text-error">
            ${total_expense.toLocaleString()}
          </p>

          <p className="text-xs md:text-sm opacity-60">
            Money spent
          </p>
        </div>
      </div>

      {/* TOTAL BUDGET */}
      <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
        <div className="card-body p-4 md:p-6">
          <div className="flex items-center gap-2 text-info">
            <PiggyBank size={18} className="md:w-5 md:h-5" />
            <h2 className="font-medium md:font-semibold text-sm md:text-base">Budget</h2>
          </div>

          <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2 text-info">
            ${total_budget.toLocaleString()}
          </p>

          <p className="text-xs md:text-sm opacity-60">
            Planned limit
          </p>
        </div>
      </div>

    </div>
  );
};

export default OverviewAnalyticsCard;
