import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import Balance from "../components/Balance";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Savings from "../components/Savings";
import AddIncomePopover from "../components/AddIncomePopover";
import AddExpensePopover from "../components/AddExpensePopover";
import CallForExpenseBtn from "../components/CallForExpenseBtn";

const Home: React.FC = () => {
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  return (
    <div className="relative min-h-screen p-6 md:p-10 space-y-10">
      {/* Popovers Layer */}
      <AddIncomePopover isOpen={isIncomeOpen} setIsOpen={setIsIncomeOpen} />
      <AddExpensePopover isOpen={isExpenseOpen} setIsOpen={setIsExpenseOpen} />

      {/* Floating Quick Action Button */}
      <CallForExpenseBtn 
        onIncomeClick={() => setIsIncomeOpen(true)} 
        onExpenseClick={() => setIsExpenseOpen(true)} 
      />

      <header className="flex flex-col md:row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            Welcome, Sana <Sparkles className="text-indigo-500" size={28} />
          </h1>
          <p className="text-slate-500 text-sm">Manage your wealth efficiently</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Balance />
        {/* Cards can also trigger the modals */}
        <Income onAddClick={() => setIsIncomeOpen(true)} />
        <Expense onAddClick={() => setIsExpenseOpen(true)} />
        <Savings />
      </section>
    </div>
  );
};

export default Home;
