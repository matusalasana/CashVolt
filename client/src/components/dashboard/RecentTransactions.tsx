import { useTransactions } from "../../hooks/useTransactions";
import TransactionCard from "../transactions/TransactionCard"
import DashboardLoader from "./DashboardLoader"

import { ArrowRightIcon } from "lucide-react";
import {Link} from "react-router-dom"

const RecentTransactions = () => {
  const { data: transactions, isLoading } =
    useTransactions("", "created_at", "desc", 5, 0);

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <Link to ="/transactions ">
    <div className="bg-base-200 dark:bg-base-300 p-5 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-base-content">
          Recent Transactions
        </h2>
      </div>

      {/* List */}
      <div className="space-y-3">
        {transactions?.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-base-100 dark:bg-base-200 rounded-xl p-3 hover:shadow-lg transition duration-200"
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
          <p className="text-sm text-base-content/60 text-center py-6">
            No recent transactions: recent transactions will appear here.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5">
        <button className="btn btn-outline btn-sm w-full flex items-center justify-center gap-2 hover:btn-primary transition">
          View more
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
    </Link>
  );
};

export default RecentTransactions;