import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

// Components
import ProtectedRoutes from "./components/ProtectedRoutes";

// Pages
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import BudgetPlanning from "./pages/BudgetPlanning";
import Accounts from "./pages/Accounts";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget-planning" element={<BudgetPlanning />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;