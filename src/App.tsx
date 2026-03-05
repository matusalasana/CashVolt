import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components & Pages imports (keep your existing imports here)
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Income from "./pages/Income";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Goal from "./pages/Goal";
import DaysTracker from "./pages/DaysTracker";
import TransactionHistory from "./pages/TransactionHistory";
import Terms from "./pages/Terms"
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ExcelActions from "./components/ExcelActions";
import Nav from "./components/Nav";

function App() {
  const { pathname } = useLocation();

  // Automatically scroll to top when changing routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-slate-900">
      {/* Navigation Bar */}
      <Nav />

      {/* Main Content Area */}
      <main className="flex-grow bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />}/>
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/income" element={<Income />} />
            <Route path="/tracker" element={<DaysTracker />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/excel-actions" element={<ExcelActions />} />
            <Route path="/goals" element={<Goal />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;