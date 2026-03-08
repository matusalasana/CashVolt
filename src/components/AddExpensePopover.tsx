import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useIncomeStore from '../stores/incomeStore';
import { 
  X, ChevronRight, Sparkles, Plus, Landmark, Briefcase, Coins
} from 'lucide-react';
import { toast } from "react-hot-toast";

interface Props{
  status: boolean;
}

// 1. Schema updated to match Income requirements
const incomeSchema = z.object({
  source: z.string().min(1, "Source is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

const AddExpensePopover: React.FC = ({status}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLFormElement>(null);
  const addIncome = useIncomeStore((state) => state.addIncome);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 2. Updated to use incomeSchema and appropriate defaultValues
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { amount: 0, source: '', description: '' }
  });

  const currentAmount = watch('amount');

  const onSubmit = async (data: IncomeFormData) => {
    try {
      await addIncome(data);
      toast.success(
        <div className="flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={20} />
          <div>
            <p className="font-bold">Income Added successfully!</p>
            <p className="text-xs opacity-90">{data.source} - {data.amount} ETB</p>
          </div>
        </div>
      );
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error("Failed to add income");
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON - Swapped color to Emerald for Income */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

          <form
            ref={menuRef}
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-300"
          >
            {/* Header - Emerald Gradient for Income */}
            <div className="relative h-28 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 pt-8">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black text-white tracking-tight">Add Income</h2>
              <p className="text-emerald-100/80 text-xs font-medium uppercase tracking-widest mt-1">Revenue Entry</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Amount (ETB)</label>
                <input 
                  type="number" 
                  step="0.01"
                  {...register('amount')}
                  className="w-full text-4xl font-black p-0 bg-transparent border-none focus:ring-0 outline-none dark:text-white"
                  placeholder="0.00"
                />
                {errors.amount && <p className="mt-1 text-xs text-rose-500">{errors.amount.message}</p>}
              </div>

              {/* Quick Add */}
              <div className="flex gap-2">
                {[1000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setValue('amount', (currentAmount || 0) + val)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold text-slate-500 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    +{val.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Source Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Source</label>
                <div className="relative flex items-center">
                  <Briefcase size={18} className="absolute left-4 text-slate-400" />
                  <input 
                    type="text" 
                    {...register('source')}
                    placeholder="Salary, Freelance, Gift..."
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-transparent focus:border-emerald-500/20 outline-none dark:text-white text-sm"
                  />
                </div>
                {errors.source && <p className="mt-1 text-xs text-rose-500">{errors.source.message}</p>}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Details</label>
                <div className="relative flex items-center">
                  <Coins size={18} className="absolute left-4 text-slate-400" />
                  <input 
                    type="text" 
                    {...register('description')}
                    placeholder="Monthly salary payment..."
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-transparent focus:border-emerald-500/20 outline-none dark:text-white text-sm"
                  />
                </div>
                {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : (
                  <>Add <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddExpensePopover;