import { PiggyBank } from "lucide-react";

const SavingsEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
      
      <PiggyBank className="text-base-content/20 mb-4" size={48} />

      <p className="text-xl font-medium text-base-content/50">
        No savings goals yet
      </p>

      <p className="text-sm text-base-content/40 mt-1">
        Start by creating your first savings goal
      </p>
    </div>
  );
};

export default SavingsEmptyState;