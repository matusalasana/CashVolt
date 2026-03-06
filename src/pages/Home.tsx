import React from 'react';
import { Sparkles, TrendingUp, Award } from 'lucide-react';
import Balance from "../components/Balance";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Savings from "../components/Savings";
import MonthlySummary from "../components/MonthlySummary";
import CallForExpenseBtn from "../components/CallForExpenseBtn";

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            Welcome back!
            <Sparkles className="text-indigo-500" size={28} />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Here's your financial overview for today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp size={16} />
              +12.5% this month
            </span>
          </div>
          <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Award size={16} />
              Gold Member
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <CallForExpenseBtn />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Balance />
          <Income />
        </div>
        <div className="space-y-6">
          <Expense />
          <Savings />
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="mt-8">
        <MonthlySummary />
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <QuickStat 
          label="Daily Average" 
          value="1,250" 
          change="+5%" 
          color="text-emerald-500"
        />
        <QuickStat 
          label="Best Day" 
          value="Thursday" 
          change="2,400 ETB" 
          color="text-blue-500"
        />
        <QuickStat 
          label="Categories" 
          value="8 Active" 
          change="+2 new" 
          color="text-purple-500"
        />
        <QuickStat 
          label="Streak" 
          value="15 Days" 
          change="🔥" 
          color="text-amber-500"
        />
      </div>
    </div>
  );
};

const QuickStat = ({ label, value, change, color }: { label: string; value: string; change: string; color: string }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
    <p className="text-lg font-bold text-slate-800 dark:text-white">{value}</p>
    <p className={`text-xs ${color}`}>{change}</p>
  </div>
);

export default Home;