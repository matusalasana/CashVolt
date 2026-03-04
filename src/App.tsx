
import Home from "./pages/Home"
import Expense from "./pages/Expense"
import Income from "./pages/Income"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Goal from "./pages/Goal"
import DaysTracker from "./pages/DaysTracker"
import TransactionHistory from "./pages/TransactionHistory"
import Footer from "./components/Footer"
import ExcelActions from "./components/ExcelActions"

import { Routes, Route } from "react-router-dom";

function App() {
  
    return (
      <div>
        <div className="bg-linear-to-b from-blue-200 to-blue-100 p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
            <Route path="/days-tracker" element={<DaysTracker />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/123" element={<ExcelActions />} />
            <Route path="/goal" element={<Goal />} />
          </Routes>
        </div>
          <Footer/>
      </div>
    )
}

export default App;