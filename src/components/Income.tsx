import React from 'react';
import { TrendingUp, Trash, Gift, Briefcase, Plus, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import useIncomeStore from "../stores/incomeStore";
import AddIncomePopover from "./AddIncomePopover"

import {useState} from "react"

interface Props{
  onClickPlus: (val: boolean) =>void
}

const Income: React.FC = ({onClickPlus}:Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const incomeSources = useIncomeStore((state) => state.items);
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const removeIncome = useIncomeStore((state) => state.removeIncome)

  // Group income by source for better visualization
  const groupedIncome = incomeSources.reduce((acc, item) => {
    if (!acc[item.source]) {
      acc[item.source] = { total: 0, count: 0, items: [] };
    }
    acc[item.source].total += item.amount;
    acc[item.source].count += 1;
    acc[item.source].items.push(item);
    return acc;
  }, {} as Record<string, { total: number; count: number; items: typeof incomeSources }>);

  const topSource = Object.entries(groupedIncome).sort((a, b) => b[1].total - a[1].total)[0];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
      {/* Header with gradient accent */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-md opacity-50"></div>
            <div className="relative p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl text-white">
              <TrendingUp size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Income Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track your earnings</p>
          </div>
        </div>
        <button onClick={()=>setIsOpen(true)} className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors">
          <Plus onClick={() => onClickPlus(true)} size={20} />
        </button>
      </div>
      <AddIncomePopover status={isOpen}/>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl">
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Total Income</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">
            {totalIncome.toLocaleString()}
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1"> ETB</span>
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Income Sources</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">
            {Object.keys(groupedIncome).length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active sources</p>
        </div>
      </div>

      {/* Income Sources Breakdown */}
      {topSource && (
        <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Top Source</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpRight size={12} />
              {Math.round((topSource[1].total / totalIncome) * 100)}% of total
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800 dark:text-white">{topSource[0]}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{topSource[1].count} transactions</p>
            </div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {topSource[1].total.toLocaleString()} ETB
            </p>
          </div>
        </div>
      )}

      {/* Income List */}
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {incomeSources.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/30 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
          >
          
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                {item.source === 'Salary' ? <Briefcase size={18} className="text-blue-500" /> :
                 item.source === 'Gift' ? <Gift size={18} className="text-rose-500" /> :
                 <TrendingUp size={18} className="text-emerald-500" />}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">{item.source}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                +{item.amount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <Trash className="text-red-600" onClick={() => removeIncome(item.id)} />
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar size={14} />
            This Month
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            +{totalIncome.toLocaleString()} ETB
          </span>
        </div>
      </div>
    </div>
  );
};

export default Income;