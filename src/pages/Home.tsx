
import Income from "../components/Income"
import Expense from "../components/Expense"

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Income />
      <Expense />
    </div>
  )
}

export default Home