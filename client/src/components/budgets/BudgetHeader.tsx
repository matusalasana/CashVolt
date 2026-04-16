
const BudgetHeader = ({ onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">Your Budgets</h1>

      <button onClick={onAdd} className="btn btn-primary">
        + Add Budget
      </button>
    </div>
  );
};

export default BudgetHeader;