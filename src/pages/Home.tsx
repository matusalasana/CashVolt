import React, { useState } from "react";
import { Sparkles, TrendingUp, Award } from "lucide-react";

import Balance from "../components/Balance";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Savings from "../components/Savings";
import AddIncomePopover from "../components/AddIncomePopover";
import AddExpensePopover from "../components/AddExpensePopover";

const Home: React.FC = () => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  
  return (
    <div className="relative min-h-screen p-6 md:p-10 space-y-10">
      
      {/* 1. Add Income Popover controlled by Home state */}
      <AddIncomePopover 
        isOpen={isIncomeModalOpen} 
        setIsOpen={setIsIncomeModalOpen} 
      />

      <AddExpensePopover />

      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            Welcome back, Sana <Sparkles className="text-indigo-500" size={28} />
          </h1>
          <p className="text-slate-500 text-sm">Your financial overview</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Balance />
        
        {/* 2. When Income plus is clicked, it opens the modal */}
        <Income onAddClick={() => setIsIncomeModalOpen(true)} />
        
        <Expense />
        <Savings />
      </section>

    </div>
  );
};

export default Home;
