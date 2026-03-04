
import Income from "../components/Income"
import Expense from "../components/Expense"
import Balance from "../components/Balance"
import Savings from "../components/Savings"

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Income />
      <Expense />
      <Balance />
      <Savings />
    </div>
  )
}

export default Home