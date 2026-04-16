import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from "lucide-react";

type CategoryCardProps = {
  name: string;
  type: "income" | "expense";
  onEdit?: () => void;
  onDelete?: () => void;
};

const CategoryCard = ({ name, type, onEdit, onDelete }: CategoryCardProps) => {
  const isIncome = type === "income";

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all duration-200">
      <div className="card-body flex flex-row items-center justify-between p-4">
        
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`p-3 rounded-full ${
              isIncome ? "bg-success/20 text-success" : "bg-error/20 text-error"
            }`}
          >
            {isIncome ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
          </div>

          {/* Content */}
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>
            <span
              className={`text-sm font-medium ${
                isIncome ? "text-success" : "text-error"
              }`}
            >
              {type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right side (actions) */}
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="btn btn-sm btn-ghost text-info"
            >
              <Pencil size={18} />
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="btn btn-sm btn-ghost text-error"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;