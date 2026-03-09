import { TrendingUp, Trash, Briefcase, Plus } from 'lucide-react'; // Removed Gift
import useIncomeStore from "../stores/incomeStore";

interface Props {
  onAddClick: () => void;
}

const Income: React.FC<Props> = ({ onAddClick }) => {
  const incomeSources = useIncomeStore((state) => state.items);
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const removeIncome = useIncomeStore((state) => state.removeIncome);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl text-white">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Income</h3>
            <p className="text-sm text-slate-500">{totalIncome.toLocaleString()} ETB</p>
          </div>
        </div>
        <button 
          onClick={onAddClick} 
          className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 hover:bg-emerald-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {incomeSources.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
            <div className="flex justify-between items-center gap-3">
            
              <div className="p-2 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
                {item.source === 'Salary' ? <Briefcase size={16} className="text-blue-500" /> : <TrendingUp size={16} className="text-emerald-500" />}
              </div>
              <p className="font-semibold text-sm dark:text-white">{item.source}</p>
            </div>
            
            <div>
              <p className="font-bold text-emerald-600 text-sm">+{item.amount.toLocaleString()}</p>
            </div>
            
              <button onClick={() => removeIncome(item.id)} className="text-slate-500 hover:text-red-700 transition-colors">
                <Trash size={18} />
              </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Income;