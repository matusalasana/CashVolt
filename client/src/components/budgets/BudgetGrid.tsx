import BudgetCard from "./BudgetCard";
import BudgetsEmptyState from "./BudgetsEmptyState";
import {type BudgetInput} from "../../types";


type BudgetGridProps = {
  data: BudgetInput[];
  onEdit?: (budget: BudgetInput) => void;
  onDelete?: (budget: BudgetInput) => void;
};

const BudgetGrid = ({ data, onEdit, onDelete }: BudgetGridProps) => {
  if (!data?.length) {
    return (
      <div className="text-center py-20 text-base-content/60">
        <BudgetsEmptyState />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((b) => (
        <BudgetCard 
          key={b.id}
          id={b.id}
          amount={b.amount}
          category={b.category_name}
          month={b.month}
          year={b.year}
          onEdit={() => onEdit?.(b)}
          onDelete={() => onDelete?.(b)}
          remaining={b.remaining}
          spent={b.spent}
        />
      ))}
    </div>
  );
};

export default BudgetGrid;