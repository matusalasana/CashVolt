
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  PiggyBank, 
  Pencil, 
  Trash2, 
  Calendar 
} from 'lucide-react';

interface TransactionProps {
  amount: number;
  date: string | Date;
  type: "income" | "expense" | "savings";
  category?: string;
  title?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionCard = ({
  amount,
  date,
  type,
  category,
  title,
  onEdit,
  onDelete,
}: TransactionProps) => {

  // Configuration based on transaction type
  const typeConfig = {
    income: {
      icon: <ArrowDownLeft size={20} />,
      colorClass: "text-success bg-success/10",
      hoverClass: "group-hover:bg-success group-hover:text-success-content",
      prefix: "+"
    },
    expense: {
      icon: <ArrowUpRight size={20} />,
      colorClass: "text-error bg-error/10",
      hoverClass: "group-hover:bg-error group-hover:text-error-content",
      prefix: "-"
    },
    savings: {
      icon: <PiggyBank size={20} />,
      colorClass: "text-primary bg-primary/10",
      hoverClass: "group-hover:bg-primary group-hover:text-primary-content",
      prefix: ""
    }
  };

  const { icon, colorClass, hoverClass, prefix } = typeConfig[type];

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 group">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          
          {/* Section: Icon & Identity */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${colorClass} ${hoverClass}`}>
              {icon}
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-50">
                {category || 'General'}
              </span>
              <h3 className="font-bold text-base-content text-lg leading-tight">
                {title || 'Untitled Transaction'}
              </h3>
            </div>
          </div>

          {/* Section: Amount */}
          <div className="text-right">
            <span className={`text-lg font-black ${type === 'income' ? 'text-success' : 'text-base-content'}`}>
              {prefix}${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="divider my-1 opacity-20"></div>

        {/* Section: Footer Actions & Date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs opacity-60">
            <Calendar size={14} />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>

          <div className="flex gap-1">
            {onEdit && (
              <button 
                onClick={onEdit}
                className="btn btn-ghost btn-xs btn-square text-info hover:bg-info/10"
                aria-label="Edit transaction"
              >
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button 
                onClick={onDelete}
                className="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10"
                aria-label="Delete transaction"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
