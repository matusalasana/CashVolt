import React from 'react';
import { Landmark, TrendingUp, Shield, Sparkles } from 'lucide-react';

import useDerivedStats from "../stores/derivedStats";

const Balance: React.FC = () => {
  const { totalIncome, savingsRate, totalExpense, availableBalance } = useDerivedStats();
  
  
  const getBalanceStatus = () => {
    if (availableBalance > totalIncome * 0.5) return { text: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (availableBalance > totalIncome * 0.2) return { text: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (availableBalance > 0) return { text: 'Fair', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { text: 'Critical', color: 'text-rose-400', bg: 'bg-rose-500/20' };
  };

  const status = getBalanceStatus();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl group transition-all duration-500 hover:shadow-indigo-500/10">
      
      {/* Animated Background Patterns */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full filter blur-[80px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600 rounded-full filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <Landmark size={28} className="text-indigo-300" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-indigo-200/70">Total Balance</h3>
              <p className="text-xs text-indigo-300/50 uppercase tracking-wider font-bold">Consolidated</p>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full ${status.bg} border border-white/5 backdrop-blur-sm`}>
            <span className={`text-xs font-black uppercase tracking-tighter ${status.color}`}>{status.text}</span>
          </div>
        </div>

        {/* Main Balance Display */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              {availableBalance.toLocaleString()}
            </span>
            <span className="text-xl font-bold text-indigo-400/80">ETB</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-semibold">
              <TrendingUp size={14} />
              <span>{savingsRate.toFixed(1)}% Savings</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-indigo-200/60 text-sm">
              <Shield size={14} />
              <span className="text-xs font-medium uppercase tracking-widest">Verified</span>
            </div>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
            <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-1">Income</p>
            <p className="text-xl font-bold text-white">
              <span className="text-emerald-500 mr-1">+</span>
              {totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
            <p className="text-[10px] uppercase font-bold text-rose-500 tracking-widest mb-1">Expense</p>
            <p className="text-xl font-bold text-white">
              <span className="text-rose-500 mr-1">-</span>
              {totalExpense.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-8 flex items-center justify-center gap-2 py-3 border-t border-white/5 text-indigo-300/40 text-xs italic">
          <Sparkles size={14} className="animate-spin-slow" />
          <span>Financial stats update automatically in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
