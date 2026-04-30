import { Plus, Sparkles } from "lucide-react";

interface Props {
  onAdd: () => void;
}

const TransactionsHeader = ({ onAdd }: Props) => {
  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-5 sm:p-6 rounded-2xl
      bg-base-100/70 backdrop-blur-xl border border-base-200 shadow-md overflow-hidden">

      {/* Decorative blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl" />

      {/* LEFT */}
      <div className="relative z-10">

        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Transactions History
        </h1>

        <p className="text-xs sm:text-sm text-base-content/60 mt-1 flex items-center gap-1">
          <Sparkles size={12} className="text-primary" />
          Track your financial activity
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={onAdd}
        className="relative z-10 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
          bg-primary text-primary-content text-sm font-medium
          shadow-md hover:shadow-lg transition-all duration-200
          active:scale-95 w-full sm:w-auto"
      >
        <Plus size={18} className="transition-transform group-hover:rotate-90" />
        Add
      </button>
    </div>
  );
};

export default TransactionsHeader;