import React from 'react';
import { Landmark, ArrowUpRight, Percent } from 'lucide-react';

const Balance: React.FC = () => {
  const balanceAmount = 6800;
  const percentage = 68;

  // SVG Circle calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-50 rounded-full transition-transform group-hover:scale-110" />

      <div className="flex items-center gap-2 mb-4 self-start">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Landmark size={20} />
        </div>
        <h3 className="font-semibold text-slate-700">Available Balance</h3>
      </div>

      <div className="flex flex-col items-center justify-center py-2">
        {/* Radial Progress Gauge */}
        <div className="relative flex items-center justify-center mb-4">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="text-indigo-600 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800">{percentage}%</span>
            <span className="text-[10px] uppercase text-slate-400 font-bold">Left</span>
          </div>
        </div>

        {/* Currency Display */}
        <div className="text-center">
          <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {balanceAmount.toLocaleString()} <span className="text-sm font-medium">ETB</span>
          </p>
          <div className="flex items-center justify-center gap-1 mt-1 text-emerald-500 font-medium text-sm">
            <ArrowUpRight size={14} />
            <span>+2.4% from last week</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full mt-6 pt-4 border-t border-slate-50 flex justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-1 uppercase tracking-wider">
          <Percent size={12} />
          Usage Ratio
        </div>
        <span className="text-slate-800">Normal</span>
      </div>
    </div>
  );
};

export default Balance;
