import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  Utensils, 
  Bus, 
  ShoppingBag, 
  Zap, 
  Film, 
  Plus,
  Calendar,
  Wallet
} from 'lucide-react';

const AddExpense: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Food');
  const [note, setNote] = useState<string>('');

  const quickAmounts = [50, 100, 500, 1000];
  
  const categories = [
    { name: 'Food', icon: <Utensils size={18} />, color: 'bg-emerald-500' },
    { name: 'Transport', icon: <Bus size={18} />, color: 'bg-blue-500' },
    { name: 'Shopping', icon: <ShoppingBag size={18} />, color: 'bg-rose-500' },
    { name: 'Bills', icon: <Zap size={18} />, color: 'bg-amber-500' },
    { name: 'Fun', icon: <Film size={18} />, color: 'bg-indigo-500' },
  ];

  const handleQuickAdd = (val: number) => {
    const current = parseFloat(amount || '0');
    setAmount((current + val).toString());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 pb-0 flex justify-between items-center">
          <button className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">New Expense</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Amount Input Display */}
        <div className="p-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-slate-300">ETB</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-6xl font-black text-slate-900 w-full text-center outline-none bg-transparent placeholder:text-slate-100 transition-all"
            />
          </div>
          <p className="text-xs font-medium text-slate-400">Today, {new Date().toLocaleDateString()}</p>
        </div>

        {/* Quick Add Chips */}
        <div className="flex justify-center gap-2 px-6 mb-8">
          {quickAmounts.map((val) => (
            <button
              key={val}
              onClick={() => handleQuickAdd(val)}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
            >
              +{val}
            </button>
          ))}
        </div>

        {/* Options Card */}
        <div className="bg-slate-50 p-6 rounded-t-[2.5rem] space-y-6">
          
          {/* Category Selector */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</span>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className="flex flex-col items-center gap-2 min-w-[70px] group"
                >
                  <div className={`p-4 rounded-2xl transition-all ${
                    category === cat.name 
                    ? `${cat.color} text-white shadow-lg scale-110` 
                    : 'bg-white text-slate-400'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className={`text-[10px] font-bold ${category === cat.name ? 'text-slate-900' : 'text-slate-400'}`}>
                    {cat.name}
                  </span>
                </button>
              ))}
              <button className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className="p-4 rounded-2xl bg-white text-slate-300 border border-dashed border-slate-300">
                  <Plus size={18} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">More</span>
              </button>
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Note</span>
              <div className="flex items-center gap-1 text-[10px] text-indigo-500 font-bold">
                <Wallet size={10} />
                <span>Cash</span>
              </div>
            </div>
            <input 
              type="text" 
              placeholder="e.g. Lunch with Romeo"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-100 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-slate-200">
            Save Expense
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
