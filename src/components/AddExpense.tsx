import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useExpenseStore from '../stores/expenseStore';
import { 
  X, ChevronRight, Utensils, Bus, ShoppingBag, 
  Zap, Film, Wallet, Sparkles, Plus
} from 'lucide-react';
import { toast } from "react-hot-toast";

const expenseSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(3, "Note must be at least 3 characters"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpense: React.FC = () => {
  const addExpense = useExpenseStore((state) => state.addExpense);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: undefined,
      category: 'Food',
      title: ''
    }
  });

  const currentAmount = watch('amount');
  const currentCategory = watch('category');

  const categories = [
    { name: 'Food', icon: <Utensils size={24} />, color: 'from-emerald-400 to-emerald-600', emoji: '🍔' },
    { name: 'Transport', icon: <Bus size={24} />, color: 'from-blue-400 to-blue-600', emoji: '🚗' },
    { name: 'Shopping', icon: <ShoppingBag size={24} />, color: 'from-rose-400 to-rose-600', emoji: '🛍️' },
    { name: 'Bills', icon: <Zap size={24} />, color: 'from-amber-400 to-amber-600', emoji: '⚡' },
    { name: 'Fun', icon: <Film size={24} />, color: 'from-indigo-400 to-indigo-600', emoji: '🎮' },
  ];

  const quickAmounts = [50, 100, 200, 500];

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpense(data);
      toast.success(
        <div className="flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={20} />
          <div>
            <p className="font-bold">Expense Added!</p>
            <p className="text-xs opacity-90">{data.title} - {data.amount} ETB</p>
          </div>
        </div>,
        { duration: 4000 }
      );
      reset();
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
        
        {/* Header with gradient */}
        <div className="relative h-32 bg-gradient-to-r from-rose-500 to-pink-500 px-6 pt-6">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-5 left-5 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-5 right-5 w-32 h-32 bg-white rounded-full"></div>
          </div>
          
          <button type="button" className="relative z-10 p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors">
            <X size={18} />
          </button>
          <h2 className="relative z-10 mt-3 text-2xl font-bold text-white">Add New Expense</h2>
        </div>

        {/* Amount Input */}
        <div className="p-6">
          <label className="block text-sm font-medium text-slate-400 mb-2">Amount (ETB)</label>
          <div className="relative">
            <input 
              type="number" 
              step="0.01"
              {...register('amount')}
              className="w-full text-4xl font-light p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-transparent focus:border-rose-500 outline-none transition-all dark:text-white"
              placeholder="0.00"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ETB</span>
          </div>
          {errors.amount && (
            <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
              <span>⚠️</span> {errors.amount.message}
            </p>
          )}
        </div>

        {/* Quick Add */}
        <div className="px-6 pb-4">
          <p className="text-xs font-medium text-slate-400 mb-3">Quick Add</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setValue('amount', (currentAmount || 0) + val)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all"
              >
                +{val}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 pb-6">
          <p className="text-xs font-medium text-slate-400 mb-3">Category</p>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setValue('category', cat.name)}
                className="group relative"
              >
                <div className={`p-3 rounded-xl transition-all ${
                  currentCategory === cat.name 
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-110` 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:scale-105'
                }`}>
                  {cat.icon}
                </div>
                <span className="absolute -top-2 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {cat.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="px-6 pb-6">
          <label className="block text-xs font-medium text-slate-400 mb-3">Note</label>
          <div className="relative">
            <input 
              type="text" 
              {...register('title')}
              placeholder="What was this for?"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-transparent focus:border-rose-500 outline-none transition-all dark:text-white"
            />
            <Wallet className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          {errors.title && (
            <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
              <span>⚠️</span> {errors.title.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="p-6 pt-0">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Plus size={20} />
                Add Expense
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;