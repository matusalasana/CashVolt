import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

// Components & Pages imports
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Income from "./pages/Income";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Goal from "./pages/Goal";
import DaysTracker from "./pages/DaysTracker";
import TransactionHistory from "./pages/TransactionHistory";
import Terms from "./pages/Terms";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <div className={`flex flex-col min-h-screen font-sans antialiased ${
      theme === 'dark' ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-white'
    }`}>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            borderRadius: '1rem',
            padding: '1rem',
          },
          success: {
            icon: '🎉',
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            icon: '❌',
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />

      <Nav />
      
      <main className="flex-grow">
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
            <Route path="/goals" element={<Goal />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;