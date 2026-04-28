import { Edit, Trash2, Calendar } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  id?:number;
  amount: number;
  category: string;
  month: number;
  year: number;
  spent: number; 
  remaining: number;
  onEdit?: () => void;
  onDelete?: () => void;
};


const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BudgetCard = ({
  amount,
  spent,
  remaining,
  category,
  month,
  year,
  onEdit,
  onDelete,
}: Props) => {
  const { data: user } = useAuth();
  const currency = user?.currency;

  const percent = Math.min((spent / amount) * 100, 100);
  const isOver = remaining < 0;

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{category}</h2>
          <p className="text-xs opacity-60 flex items-center gap-1 mt-1">
            <Calendar size={12} />
            {MONTHS[month - 1]} {year}
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-400 hover:scale-110 transition">
            <Edit size={16} />
          </button>
          <button onClick={onDelete} className="text-red-400 hover:scale-110 transition">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="mt-4">
        <p className="text-2xl font-bold">
          {amount.toLocaleString()}{" "}
          <span className="text-sm opacity-70">{currency}</span>
        </p>
        <p className="text-xs opacity-60">Budget</p>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`h-full ${isOver ? "bg-red-400" : "bg-green-400"}`}
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between text-xs mt-2 opacity-70">
          <span>{spent.toLocaleString()} spent</span>
          <span>{Math.round(percent)}%</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className={isOver ? "text-red-400" : "text-green-400"}>
          {isOver
            ? `Over by ${Math.abs(remaining).toLocaleString()}`
            : "On track"}
        </span>

        <span className="opacity-70">
          {isOver
            ? 0
            : `${remaining.toLocaleString()}`} left
        </span>
      </div>
    </div>
  );
};

export default BudgetCard;