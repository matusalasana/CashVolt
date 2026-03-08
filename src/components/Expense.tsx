import React from 'react';
import { ArrowDownCircle, Trash, TrendingDown, Calendar, AlertCircle, PieChart } from 'lucide-react';
import useExpenseStore from "../stores/expenseStore";
import { Link } from "react-router-dom";

const Expense: React.FC = () => {
  const expenses = useExpenseStore((state) => state.items);
  const totalExpense = useExpenseStore((state) => state.totalExpense);
  const removeExpense = useExpenseStore((state) => state.removeExpense)

  // Calculate category breakdown
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;

  const getExpenseStatus = () => {
    if (totalExpense > 10000) return { text: 'High Spender', color: 'text-rose-600', bg: 'bg-rose-100' };
    if (totalExpense > 5000) return { text: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { text: 'Frugal', color: 'text-emerald-600', bg: 'bg-emerald-100' };
  };

  const status = getExpenseStatus();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500 rounded-xl blur-md opacity-50"></div>
            <div className="relative p-3 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl text-white">
              <ArrowDownCircle size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Expense Analysis</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track your spending</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full ${status.bg} bg-opacity-20`}>
          <span className={`text-sm font-bold ${status.color}`}>{status.text}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-2xl">
          <p className="text-sm text-rose-600 dark:text-rose-400 mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {totalExpense.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ETB</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{expenses.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total count</p>
        </div>
      </div>

      {/* Category Breakdown */}
      {topCategory && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <PieChart size={16} />
              Top Category
            </h4>
            <span className="text-xs text-rose-600 dark:text-rose-400">
              {Math.round((topCategory[1] / totalExpense) * 100)}% of total
            </span>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-700/50 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 dark:text-white">{topCategory[0]}</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">{topCategory[1].toLocaleString()} ETB</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-500 to-red-500 h-full rounded-full"
                style={{ width: `${(topCategory[1] / totalExpense) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Recent Expenses */}
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {expenses.slice(0, 5).map((expense) => (
          <div 
            key={expense.id} 
            className="group flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <TrendingDown size={18} className="text-rose-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">{expense.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-rose-600 dark:text-rose-400">
                -{expense.amount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <Trash className="text-red-600" onClick={() => removeExpense(expense.id)} />
          </div>
        ))}
      </div>

      {/* View All Link */}
      <Link to="/expenses">
        <button className="w-full mt-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center justify-center gap-2">
          View All Transactions
          <ArrowDownCircle size={16} />
        </button>
      </Link>
    </div>
  );
};

export default Expense;