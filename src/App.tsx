
import Home from "./pages/Home"
import Expense from "./pages/Expense"
import Income from "./pages/Income"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import { Routes, Route } from "react-router-dom";

function App() {
  
    return (
      <div className="bg-linear-to-b from-blue-200 to-blue-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    )
}

export default App;