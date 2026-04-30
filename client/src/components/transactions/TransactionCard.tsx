import {
  ArrowUpRight,
  ArrowDownLeft,
  Pencil,
  Trash2,
  HandCoins,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

type TransactionCardProps = {
  amount: number;
  date: string | Date;
  type: "income" | "expense" | "savings";
  category?: string;
  title?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const transaction_styles = {
  income: {
    Icon: ArrowUpRight,
    gradient: "from-emerald-500 to-emerald-600",
    sign: "+",
    amountColor: "text-emerald-600 dark:text-emerald-400",
  },
  expense: {
    Icon: ArrowDownLeft,
    gradient: "from-rose-500 to-rose-600",
    sign: "-",
    amountColor: "text-rose-600 dark:text-rose-400",
  },
  savings: {
    Icon: HandCoins,
    gradient: "from-amber-500 to-amber-600",
    sign: "",
    amountColor: "text-amber-600 dark:text-amber-400",
  },
};

const TransactionCard = ({
  amount,
  title,
  date,
  type,
  category,
  onEdit,
  onDelete,
}: TransactionCardProps) => {
  const { data: user } = useAuth();

  const style = transaction_styles[type];
  const Icon = style.Icon;

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row">
      <div className="flex p-2 items-center rounded-lg shadow-md">
  
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${style.gradient} text-white`}
          >
            <Icon size={18} />
          </div>
      
          <div className="flex flex-col">
            <p className="w-25 truncate text-sm font-medium lg:w-40">
              {type === "savings"
                ? title || "Untitled savings"
                : category}
            </p>
            <p className="text-xs text-base-content/50">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      
        {/* MIDDLE - AMOUNT */}
        <div className="flex-1 flex justify-center">
          <p className={`text-sm font-bold ${style.amountColor}`}>
            {style.sign}
            {Number(amount).toLocaleString()}{" "}
            <span className="text-xs font-normal text-base-content">
              {user.currency}
            </span>
          </p>
        </div>
      
        {/* RIGHT */}
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md transition hover:bg-base-200"
            >
              <Pencil size={14} />
            </button>
          )}
      
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md transition hover:bg-base-200"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;