import React from 'react';
import { PiggyBank, Target, ArrowUpRight, ShieldCheck } from 'lucide-react';

const Savings: React.FC = () => {
  const currentSavings = 2000;
  const targetGoal = 5000; // Example target
  const percentage = (currentSavings / targetGoal) * 100;

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <PiggyBank size={20} />
          </div>
          <h3 className="font-semibold text-slate-700">Total Savings</h3>
        </div>
        <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs font-bold">
          <Target size={14} />
          <span>Goal: 5k</span>
        </div>
      </div>

      {/* Main Amount */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-black text-slate-900">{currentSavings.toLocaleString()}</p>
          <span className="text-sm font-bold text-slate-400">ETB</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <ArrowUpRight size={12} className="text-emerald-500" />
          Saved 400 ETB more than last month
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Progress</span>
          <span className="text-sm font-black text-blue-600">{percentage}%</span>
        </div>
        
        {/* Modern Stepped Progress Bar */}
        <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${percentage}%` }}
          />
          {/* Subtle Grid Lines on the bar */}
          <div className="absolute inset-0 flex justify-between px-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-px h-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badge / Footer */}
      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Emergency Fund Secured
        </span>
      </div>
    </div>
  );
};

export default Savings;
