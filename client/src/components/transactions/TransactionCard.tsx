import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  PiggyBank, 
  Pencil, 
  Trash2, 
  Calendar 
} from 'lucide-react';
import { useAuth } from "../../hooks/useAuth"

interface TransactionProps {
  amount: number;
  account: string;
  date: string | Date;
  type: "income" | "expense" | "savings";
  category?: string;
  title?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionCard = ({
  amount,
  account,
  date,
  type,
  category,
  title,
  onEdit,
  onDelete,
}: TransactionProps) => {

  // Configuration based on transaction type
  const TYPE_CONFIG = {
    income: {
      icon: ArrowDownLeft ,
      color: "bg-emerald-600/80 text-emerald-600",
      hover: "group-hover:bg-emerald-600/30",
      prefix: "+",
      amountColor: "text-emerald-600",
    },
    expense: {
      icon: ArrowUpRight ,
      color: "bg-rose-600/80 text-rose-600",
      hover: "group-hover:bg-rose-600/30",
      prefix: "-",
      amountColor: "text-rose-600",
    },
    savings: {
      icon: PiggyBank ,
      color: "bg-blue-600/80 text-blue-600",
      hover: "group-hover:bg-blue-600/30",
      prefix: "",
      amountColor: "text-blue-600",
    },
  } 

  const { icon, color, hover, prefix, amountColor } = TYPE_CONFIG[type]
  const Icon = icon;
  
  const { data: user } = useAuth(); 
  const currency = user.currency;

  return (
    <div className="flex flex-col lg:flex-row">
    
      {/* Card */}
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-base-200/50 hover:border-base-300">
        <div className="card-body p-4">
        
          {/* Top */}
          <div className="flex justify-between items-start">
            {/* Left */}
            <div className="flex gap-3 items-center">
              <div className={`${color} rounded-xl p-2.5 transition-all duration-200 ${hover}`}>
                <Icon 
                  size={20} 
                  className="text-white/90" />
              </div>
              <div className="flex flex-col">
                <p className="text-base-content font-semibold text-sm">
                  {type==="savings" ? title : category }
                </p>
                <p className="text-base-content/40 text-xs">
                  {account}
                </p>
              </div>
            </div>
            
            {/* Right */}
            <div>
              <p className={`${amountColor} font-bold text-lg`}>
                {prefix}{Number(amount).toLocaleString()} {currency}
              </p>
            </div>
          </div>
          
          <div className="divider my-0"></div>
          
          {/* Bottom */}
          <div className="flex justify-between items-center">
            {/* Left */}
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-base-content/40" />
              <p className="text-base-content/40 text-xs">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            
            {/* Right */}
            <div className="flex">
              <button
                onClick={onEdit}
                className="btn btn-ghost text-base-content/60 hover:text-base-content hover:bg-base-200/50"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={onDelete}
                className="btn btn-ghost text-error/80 hover:text-error hover:bg-error/10"
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