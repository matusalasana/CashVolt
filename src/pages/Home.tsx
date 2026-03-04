import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  LayoutDashboard, 
  ArrowUpRight 
} from 'lucide-react';

// Assuming these are your updated components
import Income from "../components/Income";
import Expense from "../components/Expense";
import Balance from "../components/Balance";
import Savings from "../components/Savings";
import MonthlySummary from "../components/MonthlySummary";
import GetStartedBtn from "../components/GetStartedBtn";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your money.</p>
          </div>
          <GetStartedBtn />
        </header>

        {/* Stats Grid: Responsive 1col -> 2col -> 4col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Balance" icon={<Wallet className="text-blue-600" />}>
            <Balance />
          </StatCard>
          
          <StatCard title="Monthly Income" icon={<TrendingUp className="text-emerald-600" />}>
            <Income />
          </StatCard>
          
          <StatCard title="Monthly Expenses" icon={<TrendingDown className="text-rose-600" />}>
            <Expense />
          </StatCard>
          
          <StatCard title="Total Savings" icon={<PiggyBank className="text-amber-600" />}>
            <Savings />
          </StatCard>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Large Chart/Summary Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <LayoutDashboard size={20} />
                Spending Analysis
              </h2>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Current Month
              </span>
            </div>
            <div className="min-h-[300px] w-full bg-slate-50/50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center">
              <MonthlySummary />
            </div>
          </div>

          {/* Quick Actions/Small Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-lg font-medium opacity-90">Financial Tip</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">
                You've spent 12% less on dining out this week. Move that $40 to your "Savings" to reach your goal faster!
              </p>
              <button className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors py-2 px-4 rounded-lg">
                View Details <ArrowUpRight size={16} />
              </button>
            </div>
            
            {/* Placeholder for Recent Transactions or Goals */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">Savings Progress</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%]" />
              </div>
              <p className="text-xs text-slate-500 mt-2">65% of your $5,000 goal reached</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * Reusable StatCard Wrapper for consistency
 */
const StatCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <span className="p-2 bg-slate-50 rounded-lg">{icon}</span>
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
    </div>
    <div className="text-2xl font-bold text-slate-900">
      {children}
    </div>
  </div>
);

export default Home;
