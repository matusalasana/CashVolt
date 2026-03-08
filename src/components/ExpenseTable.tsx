import {
  Utensils,
  Zap,
  ShoppingBag,
  Bus,
  Dumbbell,
  Film,
  ChevronRight,
  PlusCircle,
  Trash2
} from "lucide-react";
import useExpenseStore from "../stores/expenseStore";

interface CategoryStyle {
  icon: React.ElementType;
  color: string;
  bg: string;
}

const categoryMap: Record<string, CategoryStyle> = {
  food: { icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
  drink: { icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
  gift: { icon: ShoppingBag, color: "text-pink-500", bg: "bg-pink-50" },
  transport: { icon: Bus, color: "text-indigo-500", bg: "bg-indigo-50" },
  shopping: { icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50" },
  class: { icon: Dumbbell, color: "text-emerald-500", bg: "bg-emerald-50" },
  fun: { icon: Film, color: "text-pink-500", bg: "bg-pink-50" },
  other: { icon: ShoppingBag, color: "text-slate-500", bg: "bg-slate-50" }
};

const ExpenseTable: React.FC = () => {
  const expenses = useExpenseStore((state) => state.items);
  const removeExpense = useExpenseStore((state) => state.removeExpense);

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
          <PlusCircle className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          No transactions yet
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          Start tracking your expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Timeline
          </p>
          <h2 className="text-3xl font-black text-slate-900">
            Activity
          </h2>
        </div>

        <span className="text-sm font-bold text-slate-700 bg-white border px-3 py-1 rounded-full">
          {expenses.length} Items
        </span>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {expenses
          .slice()
          .reverse()
          .map((expense) => {

            const category = expense.category?.toLowerCase();

            const style =
              categoryMap[category] || {
                icon: ShoppingBag,
                color: "text-slate-500",
                bg: "bg-slate-50"
              };

            const Icon = style.icon;

            return (
              <div
                key={expense.id}
                className="group flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition"
              >

                {/* Left Side */}
                <div className="flex items-center gap-4">

                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl ${style.bg} ${style.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      {expense.title}
                    </p>

                    <p className="text-xs text-slate-400">
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })}
                      <span className="mx-1">•</span>
                      <span className="capitalize">
                        {expense.category}
                      </span>
                    </p>
                  </div>

                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExpense(expense.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  <p className="font-black text-slate-900 text-lg">
                    {expense.amount?.toLocaleString()} ETB
                  </p>

                  <ChevronRight className="text-slate-300 group-hover:text-slate-700 transition" />

                </div>

              </div>
            );
          })}
      </div>

    </div>
  );
};

export default ExpenseTable;
