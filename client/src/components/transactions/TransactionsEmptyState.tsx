import { LayoutGrid } from "lucide-react";

const TransactionsEmptyState = () => {
  return (
    <div className="text-center py-20 opacity-50">
      <LayoutGrid className="mx-auto mb-4" size={48} />
      <p className="text-xl">No transactions found.</p>
    </div>
  );
};

export default TransactionsEmptyState;