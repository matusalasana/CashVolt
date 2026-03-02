import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Home from "./pages/Dashboard/Home"
import Expense from "./pages/Dashboard/Expense"
import Income from "./pages/Dashboard/Income"

import { Routes, Route } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);
    
    return (
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </div>
    )
}

export default App;
