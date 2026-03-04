import React from 'react';
import { ArrowDownCircle, Coffee, ShoppingBag, MoreHorizontal } from 'lucide-react';

const Expense: React.FC = () => {
  // Sample data - in a real app, this would come from props or a hook
  const expenses = [
    { id: 1, name: 'Kolo', amount: 2500, icon: <ShoppingBag size={16} />, color: 'bg-amber-100 text-amber-600' },
    { id: 2, name: 'Coke', amount: 600, icon: <Coffee size={16} />, color: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'Others', amount: 100, icon: <MoreHorizontal size={16} />, color: 'bg-slate-100 text-slate-600' },
  ];

  const totalExpense = 3200;

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <ArrowDownCircle size={20} />
          </div>
          <h3 className="font-semibold text-slate-700">Total Expenses</h3>
        </div>
        <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-md">
          -12% this month
        </span>
      </div>

      {/* Main Amount */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-slate-900">
          {totalExpense.toLocaleString()} <span className="text-sm font-medium text-slate-400">ETB</span>
        </p>
      </div>

      {/* Breakdown List */}
      <div className="space-y-4">
        {expenses.map((item) => (
          <div key={item.id} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.color} transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">
                {item.amount.toLocaleString()}
              </span>
            </div>
            
            {/* Visual Progress Bar (Optional but looks great) */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-red-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(item.amount / totalExpense) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-2 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors border border-dashed border-slate-200">
        View Full History
      </button>
    </div>
  );
};

export default Expense;
