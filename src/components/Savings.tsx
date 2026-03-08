import React from 'react';
import { PiggyBank, Target, TrendingUp, Shield, Award, Clock } from 'lucide-react';
import useDerivedStats from "../stores/derivedStats"

const Savings: React.FC = () => {
  const {saving, progress, goal} = useDerivedStats()
  const savings = {
    current: saving,
    goal: goal,
    monthly: saving,
  };

  const monthsToGoal = Math.ceil((savings.goal - savings.current) / savings.monthly);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md opacity-50"></div>
          <div className="relative p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <PiggyBank size={24} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Savings Goals</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Build your wealth</p>
        </div>
      </div>

      {/* Main Savings Display */}
      <div className="text-center mb-8">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Total Savings</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-black text-slate-800 dark:text-white">
            {savings.current.toLocaleString()}
          </span>
          <span className="text-lg font-medium text-slate-400">ETB</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Target size={16} className="text-indigo-500" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Goal: {savings.goal.toLocaleString()} ETB
          </span>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
              className="dark:stroke-slate-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - progress / 100)}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {progress}%
            </span>
            <span className="text-xs text-slate-400">Complete</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Time to goal</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white">{monthsToGoal == "Infinity" ? "Some" : monthsToGoal} months</p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Monthly</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white">{savings.monthly.toLocaleString()} ETB</p>
        </div>
        
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all">
          Add Savings
        </button>
        <button className="py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
          Adjust Goal
        </button>
      </div>
    </div>
  );
};

export default Savings;