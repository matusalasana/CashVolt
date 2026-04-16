const TransactionsFilters = ({ selectedType, setSelectedType }) => {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">

      <div
        onClick={() => setSelectedType("")}
        className={`badge p-4 cursor-pointer ${
          selectedType === "" ? "badge-primary" : "badge-ghost"
        }`}
      >
        All
      </div>

      <div
        onClick={() => setSelectedType("income")}
        className={`badge p-4 cursor-pointer ${
          selectedType === "income" ? "badge-success" : "badge-ghost"
        }`}
      >
        Income
      </div>

      <div
        onClick={() => setSelectedType("expense")}
        className={`badge p-4 cursor-pointer ${
          selectedType === "expense" ? "badge-error" : "badge-ghost"
        }`}
      >
        Expense
      </div>
    </div>
  );
};

export default TransactionsFilters;