 
import { PiggyBank, Target, TrendingUp, Shield, Award, Clock } from 'lucide-react';
import useDerivedStats from "../stores/derivedStats"
import {useRef, useEffect, useState} from "react"
import Title from "./Title"

const Savings: React.FC = () => {
  const {saving, handleAddSaving, handleAddGoal, progress, goal} = useDerivedStats()
  const savings = {
    current: saving,
    goal: goal,
    monthly: saving,
  };

  const monthsToGoal = Math.ceil((goal - saving) / saving);
  const savingRef = useRef<HTMLInputElement>(null)
  const goalRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

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
      
      {/* Goal & Savings popover */}
      {isOpen &&
        <div className="fixed flex flex-col justify-center items-center bg-black/90 inset-0 z-[100]">
          <form 
            ref={menuRef}
            className="flex relative bg-white rounded-2xl flex-col gap-5 items-center justify-center p-10"
          >
            <Title txt1="YOUR" txt2="SAVING GOAL" />
            <button 
            onClick={() => setIsOpen(false)}
            className="absolute border-1 border-slate-200 bg-white px-3 py-0.5 rounded-lg font-semibold text-2xl text-red-600 top-1 right-1"
          >
            x
          </button>
            <input 
              className="border-2 px-2 py-1 w-full rounded-lg outline-none border-slate-100" 
              type="number" 
              ref={savingRef} 
              placeholder="saving amount (ETB)"
            />
            <input 
              className="border-2 px-2 py-1 w-full rounded-lg outline-none border-slate-100" 
              type="number" 
              ref={goalRef} 
              placeholder="goal amount (ETB)"
            />
            <button 
              type="button"
              onClick={() =>{
                      if (savingRef.current.value>0 || goalRef.current.value>0) {
                          handleAddSaving(savingRef.current.value)
                          handleAddGoal(goalRef.current.value)
                          setIsOpen(false)
                    }}}
              className="py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      }

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Time to goal</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white">
          {
            monthsToGoal == "Infinity" 
              ? "Some months" : monthsToGoal == "NaN"
              ? "nonono" : "Not set"
            
          }</p>
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
      <div className="flex flex-col justify-center items-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all"
        >
          Adjust
        </button>
      </div>
    </div>
  );
};

export default Savings;