import BudgetSummary from "./budgets/BudgetSummary"

const Test = () => {
  return (
    <div>
      <BudgetSummary
        budgetsCount={23}
        analyticsCount={90}
      />
    </div>
  )
}

export default Test