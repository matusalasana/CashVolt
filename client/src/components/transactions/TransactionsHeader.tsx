import { Plus } from "lucide-react";

interface Props{
  onAdd: () => void;
}

const TransactionsHeader = ({ onAdd }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Transactions
        </h1>
        <p className="text-base-content/60">
          Manage your income and expenses
        </p>
      </div>

      <button
        onClick={onAdd}
        className="btn btn-primary gap-2 shadow-lg hover:shadow-primary/20 transition-all"
      >
        <Plus size={20} />
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionsHeader;