import { Edit, Trash2, Calendar } from "lucide-react";
import { useAuth } from "../../hooks/useAuth"

type BudgetCardProps = {
  id: number;
  amount: number;
  category: string;
  month: number;
  year: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

const BudgetCard = ({
  amount,
  category,
  month,
  year,
  onEdit,
  onDelete,
}: BudgetCardProps) => {
  
  const { data: user } = useAuth(); 
  const currency = user.currency;
  
  const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  return (
    <div className="card bg-base-100 shadow-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{category}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="btn btn-sm btn-ghost text-blue-500"
            aria-label="Edit budget"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={onDelete}
            className="btn btn-sm btn-ghost text-red-500"
            aria-label="Delete budget"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <p className="text-2xl font-bold text-primary">
          {Number(amount || 0).toLocaleString()} <span className="text-sm font-normal">{currency}</span>
        </p>
        <p className="text-sm text-gray-500">Budget Amount</p>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>
          {MONTHS[month-1]} {year}
        </span>
      </div>
    </div>
  );
};

export default BudgetCard;