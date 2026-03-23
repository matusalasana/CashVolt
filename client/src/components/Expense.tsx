 
import { ArrowDownCircle, Trash, TrendingDown, Plus } from 'lucide-react';
import useExpenseStore from "../stores/expenseStore";
import { Link } from "react-router-dom";

interface Props {
  onAddClick: () => void;
}

const Expense: React.FC<Props> = ({ onAddClick }) => {
  const expenses = useExpenseStore((state) => state.items);
  const totalExpense = useExpenseStore((state) => state.totalExpense);
  const removeExpense = useExpenseStore((state) => state.removeExpense);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl text-white">
            <ArrowDownCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Expenses</h3>
            <p className="text-sm text-slate-500">Total: {totalExpense.toLocaleString()} ETB</p>
          </div>
        </div>
        <button 
          onClick={onAddClick}
          className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded-xl text-rose-600 hover:bg-rose-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
        {expenses.map((expense) => (
          <div key={expense.id} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-600 rounded-lg">
                <TrendingDown size={18} className="text-rose-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-white">{expense.title}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{expense.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="font-bold text-rose-600">-{expense.amount.toLocaleString()}</p>
            </div>
            
              <button onClick={() => removeExpense(expense.id)} className="text-slate-500 hover:text-rose-700">
                <Trash size={18} />
              </button>
            
          </div>
        ))}
      </div>

      <Link to="/expenses" className="block mt-6">
        <button className="w-full py-3 text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 dark:bg-slate-900/50 rounded-xl">
          View All Transactions
        </button>
      </Link>
    </div>
  );
};

export default Expense;
