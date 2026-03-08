import React from "react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Wallet
} from "lucide-react";

import Balance from "../components/Balance";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Savings from "../components/Savings";
import AddIncomePopover from "../components/AddIncomePopover";
import AddExpensePopover from "../components/AddExpensePopover"
import MonthlySummary from "../components/MonthlySummary";
import CallForExpenseBtn from "../components/CallForExpenseBtn";

import {useState} from "react"

const Home: React.FC = () => {
  
  const currentMonth = 12.5
  const memberStatus = "Gold"
  const [status, setStatus] = useState<boolean>(false)
  
  return (
    <div className="space-y-10">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            Welcome back, Sana
            <Sparkles className="text-indigo-500 animate-pulse" size={28} />
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Here's your financial overview for today
          </p>
        </div>

        {/* Right header badges */}
        <div className="flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <TrendingUp size={16} className="text-emerald-500"/>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {currentMonth}%
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Award size={16} className="text-indigo-500"/>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {memberStatus} Member
            </span>
          </div>

        </div>
      </header>
      
      <section className="bg-red-500">
        <AddExpensePopover />
      </section>

      <section className="flex flex-wrap gap-4">
        <AddIncomePopover isClicked={status} />
        <CallForExpenseBtn />
      </section>

      {/* Financial Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Balance />
        {status}f
        <Income onClickPlus={(val) => setStatus(val)} />
        <Expense />
        <Savings />
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <MonthlySummary />
        </div>
      </section>

    </div>
  );
};


type QuickStatProps = {
  label: string;
  value: string;
  change: string;
  color: string;
  icon: React.ReactNode;
};

const QuickStat = ({ label, value, change, color, icon }: QuickStatProps) => (

  <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition">

    <div className="flex items-center justify-between mb-2">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <span className={`${color}`}>
        {icon}
      </span>
    </div>

    <p className="text-xl font-bold text-slate-800 dark:text-white">
      {value}
    </p>

    <p className={`text-xs mt-1 ${color}`}>
      {change}
    </p>

  </div>

);

export default Home;