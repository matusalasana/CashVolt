import { Plus, Sparkles } from "lucide-react";

interface Props {
  onAdd: () => void;
}

const TransactionsHeader = ({ onAdd }: Props) => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 rounded-2xl 
      bg-base-100/70 backdrop-blur-xl 
      border border-base-200 
      shadow-xl transition-all">

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-3xl -z-0" />

      {/* LEFT CONTENT */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider 
            bg-primary/10 px-2 py-1 rounded-full">
            Overview
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-base-content">
          Transactions
        </h1>

        <p className="text-sm text-base-content/60 mt-2 flex items-center gap-1">
          <Sparkles size={12} className="text-primary" />
          Track all your financial activities in one place
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={onAdd}
        className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-primary text-primary-content font-semibold
          shadow-lg shadow-primary/20
          hover:shadow-xl hover:shadow-primary/30
          transition-all duration-300 hover:scale-105 active:scale-95
          overflow-hidden"
      >
        <Plus size={18} className="relative transition-transform duration-300 group-hover:rotate-90" />
        <span className="relative text-sm">Add Transaction</span>
      </button>
    </div>
  );
};

export default TransactionsHeader;