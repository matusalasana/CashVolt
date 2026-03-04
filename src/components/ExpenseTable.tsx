import React from 'react';
import { 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Stethoscope, 
  Bus, 
  Dumbbell, 
  Film, 
  ChevronRight 
} from 'lucide-react';

const ExpenseTable: React.FC = () => {
  // Data structure for easier management
  const categories = [
    { title: "Food", icon: <Utensils size={18} />, color: "bg-emerald-500", items: [
      { name: "Dabo kolo", price: 400 },
      { name: "Mother bet", price: 200 }
    ]},
    { title: "Fixed Expenses", icon: <Zap size={18} />, color: "bg-amber-500", items: [
      { name: "Water", price: 800 },
      { name: "Electric", price: 1000 }
    ]},
    { title: "Shopping", icon: <ShoppingBag size={18} />, color: "bg-rose-500", items: [
      { name: "Jacket", price: 2400 },
      { name: "T-shirt", price: 900 }
    ]},
    { title: "Medical", icon: <Stethoscope size={18} />, color: "bg-blue-500", items: [
      { name: "Teeth", price: 4000 },
      { name: "Insurance", price: 2000 }
    ]},
    { title: "Transportation", icon: <Bus size={18} />, color: "bg-pink-500", items: [
      { name: "Piasa", price: 40 },
      { name: "Addisu Gebeya", price: 20 }
    ]},
    { title: "Fitness", icon: <Dumbbell size={18} />, color: "bg-cyan-500", items: [
      { name: "Gym membership", price: 600 }
    ]},
    { title: "Entertainment", icon: <Film size={18} />, color: "bg-indigo-500", items: [
      { name: "Chips", price: 40 },
      { name: "Dabo kolo", price: 150 }
    ]}
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {categories.map((cat, idx) => {
        const total = cat.items.reduce((sum, item) => sum + item.price, 0);
        
        return (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Category Header */}
            <div className={`p-4 ${cat.color} text-white flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                {cat.icon}
                <h3 className="font-bold tracking-wide uppercase text-sm">{cat.title}</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                {cat.items.length} Items
              </span>
            </div>

            {/* Items List */}
            <div className="p-2">
              <table className="w-full text-sm text-left">
                <tbody>
                  {cat.items.map((item, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 group">
                      <td className="py-3 px-4 text-slate-600 group-hover:text-slate-900 transition-colors">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-700">
                        {item.price.toLocaleString()} <span className="text-[10px] text-slate-400">ETB</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Footer */}
            <div className="bg-slate-50 p-4 flex justify-between items-center border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Category Total</span>
              <span className="font-bold text-slate-900">
                {total.toLocaleString()} <span className="text-xs">ETB</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseTable;