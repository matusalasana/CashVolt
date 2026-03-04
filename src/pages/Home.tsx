
import Income from "../components/Income"
import Expense from "../components/Expense"
import Balance from "../components/Balance"
import Savings from "../components/Savings"
import MonthlySummary from "../components/MonthlySummary"

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Income />
        <Expense />
        <Balance />
        <Savings />
      </div>
      <div className="pt-3">
      <MonthlySummary />
      </div>
    </div>
  )
}

export default Home