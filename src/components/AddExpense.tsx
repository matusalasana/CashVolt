import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useExpenseStore from "../stores/expenseStore";
import {
  X,
  ChevronRight,
  Utensils,
  Bus,
  ShoppingBag,
  Zap,
  Film,
  Wallet,
  Sparkles,
  Plus,
  Gift
} from "lucide-react";
import { toast } from "react-hot-toast";

const expenseSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(3, "Note must be at least 3 characters")
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const categories = [
  { name: "Food", icon: <Utensils size={20} />, color: "from-emerald-400 to-emerald-600", emoji: "🍔" },
  { name: "Drink", icon: <Utensils size={20} />, color: "from-cyan-400 to-cyan-600", emoji: "🥤" },
  { name: "Gift", icon: <Gift size={20} />, color: "from-pink-400 to-pink-600", emoji: "🎁" },
  { name: "Transport", icon: <Bus size={20} />, color: "from-blue-400 to-blue-600", emoji: "🚗" },
  { name: "Shopping", icon: <ShoppingBag size={20} />, color: "from-rose-400 to-rose-600", emoji: "🛍️" },
  { name: "Class", icon: <Zap size={20} />, color: "from-amber-400 to-amber-600", emoji: "📚" },
  { name: "Fun", icon: <Film size={20} />, color: "from-indigo-400 to-indigo-600", emoji: "🎬" },
  { name: "Other", icon: <Wallet size={20} />, color: "from-gray-400 to-gray-600", emoji: "💸" }
];

const quickAmounts = [50, 100, 200, 500];

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
      category: "Food"
    }
  });

  const currentAmount = watch("amount");
  const currentCategory = watch("category");

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpense(data);

      toast.success(
        <div className="flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={20} />
          <div>
            <p className="font-bold">Expense Added</p>
            <p className="text-xs opacity-80">
              {data.title} • {data.amount} ETB
            </p>
          </div>
        </div>
      );

      reset();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="max-w-md mx-auto">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
      >

        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-rose-500 to-pink-500 px-6 pt-6">

          <button
            type="button"
            className="p-2 bg-white/20 backdrop-blur rounded-xl text-white hover:bg-white/30 transition"
          >
            <X size={18} />
          </button>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Add Expense
          </h2>

        </div>

        {/* Amount */}
        <div className="p-6">
          <label className="text-sm text-slate-400">Amount (ETB)</label>

          <div className="relative mt-2">
            <input
              type="number"
              step="0.01"
              {...register("amount")}
              placeholder="0.00"
              className="w-full text-4xl p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-rose-500 outline-none dark:text-white"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              ETB
            </span>
          </div>

          {errors.amount && (
            <p className="text-sm text-rose-500 mt-2">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Quick Amounts */}
        <div className="px-6 pb-5">
          <p className="text-xs text-slate-400 mb-3">Quick Add</p>

          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setValue("amount", (currentAmount || 0) + value, {
                    shouldValidate: true
                  })
                }
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition"
              >
                +{value}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 pb-6">
          <p className="text-xs text-slate-400 mb-3">Category</p>

          <div className="grid grid-cols-4 gap-3">

            {categories.map((cat) => {

              const active = currentCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() =>
                    setValue("category", cat.name, { shouldValidate: true })
                  }
                  className={`p-3 rounded-xl text-center transition ${
                    active
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}
                >

                  <div className="text-lg">{cat.emoji}</div>

                  <p className="text-xs mt-1">{cat.name}</p>

                </button>
              );
            })}

          </div>
        </div>

        {/* Note */}
        <div className="px-6 pb-6">

          <label className="text-xs text-slate-400 mb-2 block">
            Note
          </label>

          <div className="relative">

            <input
              {...register("title")}
              placeholder="What was this for?"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-rose-500 outline-none dark:text-white"
            />

            <Wallet
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

          {errors.title && (
            <p className="text-sm text-rose-500 mt-2">
              {errors.title.message}
            </p>
          )}

        </div>

        {/* Submit */}
        <div className="p-6 pt-0">

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50"
          >

            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Plus size={18} />
                Add Expense
                <ChevronRight size={18} />
              </>
            )}

          </button>

        </div>

      </form>
    </div>
  );
};

export default AddExpense;