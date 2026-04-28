import { useTransactions } from "../../hooks/useTransactions";
import TransactionCard from "../transactions/TransactionCard";
import DashboardLoader from "./DashboardLoader";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const { data: transactions, isLoading } =
    useTransactions("", "created_at", "desc", 5, 0);

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="bg-base-200 dark:bg-base-300 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-base-content">
          Recent Transactions
        </h2>

        <Link
          to="/transactions"
          className="text-sm flex items-center gap-1 text-primary hover:gap-2 transition-all duration-200"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {transactions?.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-base-100 dark:bg-base-200 rounded-xl p-3 
                         hover:scale-[1.01] hover:shadow-md transition-all duration-200"
            >
              <TransactionCard
                amount={tx.amount}
                description={tx.description}
                date={tx.transaction_date}
                type={tx.type}
                category={tx.category_name}
                account={tx.account_name}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="text-base-content/60 text-sm">
              No recent transactions yet.
            </div>
            <p className="text-xs text-base-content/40 mt-1">
              Your latest activity will appear here.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default RecentTransactions;