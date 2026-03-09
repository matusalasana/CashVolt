import { PiggyBank, Target, TrendingUp, Clock } from 'lucide-react';
import useDerivedStats from "../stores/derivedStats";
import { useRef, useEffect, useState } from "react";
import Title from "./Title";

const Savings: React.FC = () => {
  const { saving, handleAddSaving, handleAddGoal, progress, goal } = useDerivedStats();
  const [isOpen, setIsOpen] = useState(false);
  
  const savingRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLFormElement>(null);

  // Logic: Avoid division by zero or NaN
  const remaining = goal - saving;
  const monthsToGoal = saving > 0 && remaining > 0 ? Math.ceil(remaining / saving) : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSaving = parseFloat(savingRef.current?.value || "0");
    const newGoal = parseFloat(goalRef.current?.value || "0");

    if (newSaving > 0) handleAddSaving(newSaving);
    if (newGoal > 0) handleAddGoal(newGoal);
    
    setIsOpen(false);
  };

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
            {saving.toLocaleString()}
          </span>
          <span className="text-lg font-medium text-slate-400">ETB</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Target size={16} className="text-indigo-500" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Goal: {goal.toLocaleString()} ETB
          </span>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-700" />
            <circle
              cx="80" cy="80" r="70" fill="none" stroke="url(#savings-gradient)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={440} // 2 * PI * 70 approx
              strokeDashoffset={440 * (1 - Math.min(progress, 100) / 100)}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="savings-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{progress}%</span>
            <span className="text-xs text-slate-400">Complete</span>
          </div>
        </div>
      </div>
      
      {/* Popover Form */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <form ref={menuRef} onSubmit={handleSubmit} className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-5">
            <Title txt1="YOUR" txt2="SAVING GOAL" />
            <button type="button" onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
              ✕
            </button>
            <div className="space-y-4">
               <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Monthly Contribution</label>
               <input className="w-full border-2 border-slate-100 dark:border-slate-700 dark:bg-slate-900 p-3 rounded-xl outline-none focus:border-indigo-500" type="number" ref={savingRef} placeholder="e.g. 5000" />
               <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Target Goal</label>
               <input className="w-full border-2 border-slate-100 dark:border-slate-700 dark:bg-slate-900 p-3 rounded-xl outline-none focus:border-indigo-500" type="number" ref={goalRef} placeholder="e.g. 50000" />
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Time to goal</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white">
            {monthsToGoal > 0 ? `${monthsToGoal} months` : "Goal Reached!"}
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Monthly</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white">{saving.toLocaleString()} ETB</p>
        </div>
      </div>

      <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-white rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
        Adjust Goals
      </button>
    </div>
  );
};

export default Savings;
