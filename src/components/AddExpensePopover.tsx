import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useExpenseStore from '../stores/expenseStore';
import { X, ChevronRight, Sparkles, Wallet } from 'lucide-react';
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpensePopover: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef<HTMLFormElement>(null);
  const addExpense = useExpenseStore((state) => state.addExpense);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { amount: 0, title: '', category: 'Food' }
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpense(data);
      toast.success(
        <div className="flex items-center gap-3">
          <Sparkles className="text-rose-500" size={20} />
          <div>
            <p className="font-bold">Expense Added!</p>
            <p className="text-xs opacity-90">{data.amount} ETB for {data.title}</p>
          </div>
        </div>
      );
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      <form
        ref={menuRef}
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-300"
      >
        <div className="relative h-28 bg-gradient-to-r from-rose-500 to-pink-500 px-8 pt-8">
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-black text-white tracking-tight">Add Expense</h2>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Amount (ETB)</label>
            <input 
              type="number" 
              step="0.01"
              {...register('amount')}
              className="w-full text-4xl font-black bg-transparent border-none focus:ring-0 outline-none dark:text-white"
              placeholder="0.00"
            />
            {errors.amount && <p className="text-rose-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                {...register('category')}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none dark:text-white text-sm"
              >
                <option value="Food">Food & Drinks</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills & Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Note</label>
              <div className="relative flex items-center">
                <Wallet size={18} className="absolute left-4 text-slate-400" />
                <input 
                  type="text" 
                  {...register('title')}
                  placeholder="Lunch, Groceries, Rent..."
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-rose-700 transition-all"
          >
            {isSubmitting ? "Saving..." : <><ChevronRight size={18} /> Add Expense</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpensePopover;
