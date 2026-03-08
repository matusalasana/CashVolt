import React, { useState } from 'react';
import { Plus, MinusCircle, TrendingUp, X } from 'lucide-react';

interface Props {
  onIncomeClick: () => void;
  onExpenseClick: () => void;
}

const CallForExpenseBtn: React.FC<Props> = ({ onIncomeClick, onExpenseClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
      {/* Menu Items */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => { onIncomeClick(); setIsOpen(false); }}
            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            <span className="text-sm font-bold text-emerald-600">Add Income</span>
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <TrendingUp size={18} />
            </div>
          </button>

          <button 
            onClick={() => { onExpenseClick(); setIsOpen(false); }}
            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-rose-100 dark:border-rose-900 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            <span className="text-sm font-bold text-rose-600">Add Expense</span>
            <div className="p-2 bg-rose-500 rounded-lg text-white">
              <MinusCircle size={18} />
            </div>
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-[1.5rem] shadow-2xl transition-all duration-300 active:scale-90 ${
          isOpen ? 'bg-slate-800 rotate-45' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
};

export default CallForExpenseBtn;
