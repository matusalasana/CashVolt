import { ArrowDownWideNarrow, ArrowUpWideNarrow, SortAsc } from "lucide-react";

const sorts = [
  { name: "Created at", value: "created_at", default: true },
  { name: "Budgets Amount", value: "amount" },
  { name: "Amount spent", value: "spent" },
];

const BudgetSorts = ({
  order,
  isLoading,
  onClickDescending,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 p-4 
      bg-base-100/60 backdrop-blur-xl 
      rounded-2xl border border-base-200 
      shadow-sm transition-all">

      {/* Label */}
      <div className="flex items-center gap-3 px-2 text-base-content/60">
        <SortAsc size={18} className="shrink-0" />
        <span className="text-sm font-medium">Sort by</span>
      </div>

      {/* Select */}
      <select
          className="select select-bordered w-full"
          onChange={(e) => onSortChange(e.target.value)}
          disabled={isLoading}
        >
        {sorts.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.name}
          </option>
        ))}
      </select>

      {/* Order button */}
      <button
        onClick={onClickDescending}
        disabled={isLoading}
        className={`
          group relative px-5 py-2.5 rounded-xl font-medium text-sm
          transition-all duration-300 flex items-center justify-center gap-2

          ${
            order === "desc"
              ? "bg-base-content-100 text-base-content shadow-sm"
              : "bg-base-content-100 text-base-content shadow-sm"
          }

          active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {order === "desc" ? (
          <>
            <ArrowDownWideNarrow size={16} />
            <span>Desc</span>
          </>
        ) : (
          <>
            <ArrowUpWideNarrow size={16} />
            <span>Asc</span>
          </>
        )}
      </button>
    </div>
  );
};

export default BudgetSorts;