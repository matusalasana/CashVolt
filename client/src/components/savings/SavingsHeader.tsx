import { PiggyBank, Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
  savingsLength: number;
}

const SavingsHeader = ({ savingsLength, onAdd }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">

      {/* Title Section */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <PiggyBank className="text-primary" size={24} />
          <h1 className="text-3xl font-bold tracking-tight">
            Your Savings Goals
          </h1>
        </div>

        <p className="text-base-content/60">
          Track your financial goals and build your future.
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onAdd}
        className="btn btn-primary gap-2 shadow-lg hover:shadow-primary/20 transition-all"
      >
        <Plus size={20} />
        Add Savings
      </button>

      {/* Stats */}
      <div className="stats shadow bg-base-100 border border-base-200">
        <div className="stat py-2 px-6">
          <div className="stat-title text-xs uppercase font-bold">
            Total Goals
          </div>
          <div className="stat-value text-2xl text-primary">
            {savingsLength}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsHeader;