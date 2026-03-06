import React from 'react';
import { 
  Utensils, Zap, ShoppingBag, Stethoscope, 
  Bus, Dumbbell, Film, ChevronRight, PlusCircle,
  ArrowDownRight
} from 'lucide-react';
import useExpenseStore from "../stores/expenseStore";

interface CategoryStyle {
  icon: React.ElementType;
  color: string;
  bg: string;
}

const categoryMap: Record<string, CategoryStyle> = {
  food: { icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
  utilities: { icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
  shopping: { icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
  healthcare: { icon: Stethoscope, color: 'text-red-500', bg: 'bg-red-50' },
  transportation: { icon: Bus, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  fitness: { icon: Dumbbell, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  entertainment: { icon: Film, color: 'text-pink-500', bg: 'bg-pink-50' },
};

const ExpenseTable: React.FC = () => {
  const expenses = useExpenseStore((state) => state.items);

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
          <PlusCircle className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No transactions yet</h3>
        <p className="text-slate-500 text-sm max-w-[200px] mt-1">
          Your wallet is looking a bit lonely. Let's add an expense!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Timeline</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Activity</h2>
        </div>
        <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Volume</span>
             <span className="text-sm font-bold text-slate-700 bg-white shadow-sm border border-slate-100 px-3 py-1 rounded-full">
               {expenses.length} Items
             </span>
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => {
          const category = expense.category.toLowerCase();
          const style = categoryMap[category] || { 
            icon: ShoppingBag, 
            color: 'text-slate-500', 
            bg: 'bg-slate-50' 
          };
          const Icon = style.icon;

          return (
            <button 
              key={expense.id}
              className="group w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl ${style.bg} ${style.color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon size={22} strokeWidth={2.5} />
                  {/* Small badge for expense indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50">
                    <ArrowDownRight size={10} className="text-red-500" />
                  </div>
                </div>
                
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-800 text-base leading-tight">
                    {expense.description}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 mt-0.5">
                    {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    <span className="mx-1.5 opacity-30">•</span>
                    <span className="capitalize">{expense.category}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg tracking-tight">
                    <span className="text-sm mr-0.5 font-bold opacity-50">$</span>
                    {expense.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTable;
