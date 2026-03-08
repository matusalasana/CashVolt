 
import { PieChart, ArrowLeftRight, BarChart3, Info } from 'lucide-react';

const MonthlySummary: React.FC = () => {
  const expenseData = [
    { label: "Food", amount: 2200, percent: 80, color: "bg-red-500" },
    { label: "Drink", amount: 1000, percent: 13, color: "bg-amber-500" },
    { label: "Entertainment", amount: 400, percent: 5, color: "bg-indigo-500" },
    { label: "Other", amount: 100, percent: 2, color: "bg-slate-400" },
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <PieChart className="text-indigo-600" size={24} />
          MONTHLY SUMMARY
        </h2>
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
          <Info size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Expenses Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <BarChart3 size={16} />
            <h3 className="text-xs font-bold uppercase tracking-widest">Expense Distribution</h3>
          </div>
          
          <div className="space-y-5">
            {expenseData.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-900">{item.amount.toLocaleString()} ETB</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`} 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 w-8 text-right">{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </div>
    </div>
  );
};

// Internal sub-component for the bottom blocks
const SummaryBlock = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="bg-white p-4 text-center rounded-xl">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{label}</p>
    <p className={`text-lg font-black ${color}`}>{value}</p>
    <span className="text-[8px] font-bold text-slate-300">ETB</span>
  </div>
);

export default MonthlySummary;
