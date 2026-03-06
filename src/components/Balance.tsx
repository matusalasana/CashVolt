import React from 'react';
import { Landmark, TrendingUp, Shield, Sparkles } from 'lucide-react';
import useExpenseStore from "../stores/expenseStore";
import useIncomeStore from "../stores/incomeStore";

const Balance: React.FC = () => {
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const totalExpense = useExpenseStore((state) => state.totalExpense);
  const balanceAmount = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balanceAmount) / totalIncome) * 100 : 0;
  
  const getBalanceStatus = () => {
    if (balanceAmount > totalIncome * 0.5) return { text: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (balanceAmount > totalIncome * 0.2) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (balanceAmount > 0) return { text: 'Fair', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { text: 'Critical', color: 'text-rose-600', bg: 'bg-rose-100' };
  };

  const status = getBalanceStatus();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl group">
      {/* Animated Background Patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/5 rounded-full"></div>

      <div className="relative z-10">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Landmark size={28} className="text-indigo-300" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-indigo-200">Total Balance</h3>
              <p className="text-xs text-indigo-300">Across all accounts</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${status.bg} bg-opacity-20 backdrop-blur-sm`}>
            <span className={`text-sm font-bold ${status.color}`}>{status.text}</span>
          </div>
        </div>

        {/* Main Balance Display */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-black tracking-tight">
              {balanceAmount.toLocaleString()}
            </span>
            <span className="text-xl font-medium text-indigo-300">ETB</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-sm">
              <TrendingUp size={16} />
              <span>+{(savingsRate).toFixed(1)}% savings rate</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-full text-white/60 text-sm">
              <Shield size={16} />
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-emerald-300 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-emerald-400">
              +{totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-rose-300 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-rose-400">
              -{totalExpense.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 flex items-center gap-2 text-indigo-300 text-sm">
          <Sparkles size={16} />
          <span>You're doing great! Keep up the financial discipline.</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;