const BudgetSummary = ({ budgetsCount, analyticsCount }) => {
  return (
    <div className="text-sm text-base-content/70">
      Showing {budgetsCount} budgets • {analyticsCount} analytics
    </div>
  );
};

export default BudgetSummary;