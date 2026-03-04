import React from 'react';
import { TrendingUp, Gift, Briefcase, PlusCircle, ArrowUpRight } from 'lucide-react';

const Income: React.FC = () => {
  // Mock data structure
  const incomeSources = [
    { id: 1, source: 'Salary', amount: 9000, icon: <Briefcase size={16} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 2, source: 'Gift', amount: 1000, icon: <Gift size={16} />, color: 'bg-purple-100 text-purple-600' },
  ];

  const totalIncome = 10000;

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <TrendingUp size={20} />
          </div>
          <h3 className="font-semibold text-slate-700">Total Income</h3>
        </div>
        <button className="text-slate-400 hover:text-emerald-600 transition-colors">
          <PlusCircle size={20} />
        </button>
      </div>

      {/* Main Display */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black text-slate-900">
            {totalIncome.toLocaleString()}
          </p>
          <span className="text-sm font-bold text-slate-400">ETB</span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-emerald-600 text-xs font-bold">
          <ArrowUpRight size={14} />
          <span>+5% vs last month</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {incomeSources.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-slate-600">{item.source}</span>
            </div>
            <span className="text-sm font-bold text-slate-800">
              {item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Income Reliability</span>
          <span className="text-emerald-500">Stable</span>
        </div>
      </div>
    </div>
  );
};

export default Income;
