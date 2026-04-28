
import {
  ArrowUpRight,
  ArrowDownLeft,
  Pencil,
  Trash2,
  Tag,
  HandCoins,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

type TransactionCardProps = {
  amount: any;
  description: any;
  date: any;
  type: any;
  category: any;
  account: any;
  onEdit?: () => void;     
  onDelete?: () => void;
};


// UI configuration per transaction type
const TRANSACTION_STYLES = {
  income: {
    Icon: ArrowUpRight,
    iconGradient: "from-emerald-500 to-emerald-600",
    hoverGradient: "from-emerald-500/5 to-transparent",
    sign: "+",
    amountColor: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/30",
  },
  expense: {
    Icon: ArrowDownLeft,
    iconGradient: "from-rose-500 to-rose-600",
    hoverGradient: "from-rose-500/5 to-transparent",
    sign: "-",
    amountColor: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-500/30",
  },
  savings: {
    Icon: HandCoins,
    iconGradient: "from-amber-500 to-amber-600",
    hoverGradient: "from-amber-500/5 to-transparent",
    sign: "",
    amountColor: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/30",
  },
};

const TransactionCard = ({
  amount,
  description,
  date,
  type,
  category,
  account,
  onEdit,
  onDelete,
}: TransactionCardProps) => {
  const { data: user } = useAuth();
  const currency = user?.currency ?? "USD";

  const style = TRANSACTION_STYLES[type];
  const Icon = style.Icon;

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        backdrop-blur-xl
        bg-base-100/60 dark:bg-base-200/30
        border border-base-200 dark:border-base-300
        shadow-sm hover:shadow-lg
        transition-all duration-300
        ${style.borderHover}
      `}
    >
      {/* hover background */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br ${style.hoverGradient}
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        `}
      />

      <div className="relative px-4 py-3.5 md:px-5 md:py-4">
        <div className="flex items-center gap-3 md:gap-4">

          {/* Icon */}
          <div
            className={`
              w-9 h-9 md:w-10 md:h-10
              rounded-xl bg-gradient-to-br ${style.iconGradient}
              flex items-center justify-center text-white
              shadow-sm
            `}
          >
            <Icon size={16} strokeWidth={1.75} />
          </div>

          {/* Description + Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-medium text-sm md:text-base text-base-content truncate">
                {description}
              </h3>
              <span className="text-[11px] md:text-xs text-base-content/50 font-mono">
                {formattedDate}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5 text-[11px] md:text-xs text-base-content/60">
              <span className="flex items-center gap-1">
                <Wallet size={10} />
                {account}
              </span>

              <span className="w-1 h-1 rounded-full bg-base-content/20" />

              <span className="flex items-center gap-1">
                {category ? (
                  <>
                    <Tag size={10} />
                    <span className="capitalize">{category}</span>
                  </>
                ) : (
                  <span className="capitalize">{type}</span>
                )}
              </span>
            </div>
          </div>

          {/* Amount + Actions */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Amount */}
            <div className="text-right">
              <p className={`text-base md:text-lg font-semibold ${style.amountColor}`}>
                {style.sign}
                {Math.abs(amount).toLocaleString()}
                <span className="text-[10px] md:text-xs font-normal text-base-content/40 ml-0.5">
                  {currency}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={onEdit}
                className="p-1.5 rounded-lg hover:bg-base-200 text-base-content/50 hover:text-primary transition"
              >
                <Pencil size={14} />
              </button>

              <button
                onClick={onDelete}
                className="p-1.5 rounded-lg hover:bg-base-200 text-base-content/50 hover:text-error transition"
              >
                <Trash2 size={14} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionCard;