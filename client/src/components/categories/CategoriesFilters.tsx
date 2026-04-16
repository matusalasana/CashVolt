const CategoriesFilters = ({ categoryType, setCategoryType }) => {
  return (
    <div className="flex flex-wrap gap-2">
      
      <button
        className={`btn ${categoryType === "" ? "btn-primary" : "btn-ghost"}`}
        onClick={() => setCategoryType("")}
      >
        All
      </button>

      <button
        className={`btn ${
          categoryType === "income" ? "btn-success" : "btn-ghost"
        }`}
        onClick={() => setCategoryType("income")}
      >
        Income
      </button>

      <button
        className={`btn ${
          categoryType === "expense" ? "btn-error" : "btn-ghost"
        }`}
        onClick={() => setCategoryType("expense")}
      >
        Expense
      </button>
    </div>
  );
};

export default CategoriesFilters;