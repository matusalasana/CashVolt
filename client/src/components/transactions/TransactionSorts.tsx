import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

const sorts = [
  { name: "Created at (default)", value: "created_at" },
  { name: "Transaction date", value: "transaction_date" },
  { name: "Amount", value: "amount" },
];

const TransactionSorts = ({
  order,
  isLoading,
  onClickDescending,
  onSortChange,
}) => {
  return (
    <div className="flex justify-evenly gap-3 mb-5">

      {/* SORT SELECT */}
      <select
        className="select select-bordered"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort By</option>
        {sorts.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.name}
          </option>
        ))}
      </select>

      {/* ASC / DESC BUTTON */}
      <button
        onClick={onClickDescending}
        className="btn btn-outline flex items-center gap-2"
        disabled={isLoading}
      >
        {order === "desc" ? (
          <>
            <ArrowDownWideNarrow size={18} />
            <span>Descending</span>
          </>
        ) : (
          <>
            <ArrowUpWideNarrow size={18} />
            <span>Ascending</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TransactionSorts;