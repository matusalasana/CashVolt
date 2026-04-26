import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Tags,
  PieChart,
  Settings,
  Menu,
  Info,
  HandCoins,
  ChartColumnBig,
  UserRound,
  Mail,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-primary text-primary-content"
        : "hover:bg-base-200 text-base-content"
    }`;

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden p-4">
        <button onClick={() => setOpen(true)} className="btn btn-ghost">
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64 bg-base-100 border-r border-base-200
          p-4 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold text-primary">CashVolt</h1>
          <p className="text-xs text-base-content/60">
            Financial system dashboard
          </p>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2 flex-1 text-sm">

          {/* CORE SYSTEM */}
          <p className="text-xs text-base-content/50 px-2 mt-2">
            CORE
          </p>

          <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/transactions" className={linkClass} onClick={handleLinkClick}>
            <CreditCard size={18} /> Transactions
          </NavLink>

          {/* MONEY STRUCTURE */}
          <p className="text-xs text-base-content/50 px-2 mt-4">
            STRUCTURE
          </p>

          <NavLink to="/accounts" className={linkClass} onClick={handleLinkClick}>
            <Wallet size={18} /> Accounts
          </NavLink>

          <NavLink to="/categories" className={linkClass} onClick={handleLinkClick}>
            <Tags size={18} /> Categories
          </NavLink>

          {/* GOALS */}
          <p className="text-xs text-base-content/50 px-2 mt-4">
            GOALS
          </p>

          <NavLink to="/savings" className={linkClass} onClick={handleLinkClick}>
            <HandCoins size={18} /> Savings
          </NavLink>

          <NavLink to="/budgets" className={linkClass} onClick={handleLinkClick}>
            <PieChart size={18} /> Budgets
          </NavLink>

          {/* INSIGHTS */}
          <p className="text-xs text-base-content/50 px-2 mt-4">
            INSIGHTS
          </p>

          <NavLink to="/analytics" className={linkClass} onClick={handleLinkClick}>
            <ChartColumnBig size={18} /> Analytics
          </NavLink>

          {/* SYSTEM */}
          <p className="text-xs text-base-content/50 px-2 mt-4">
            SYSTEM
          </p>

          <NavLink to="/settings" className={linkClass} onClick={handleLinkClick}>
            <Settings size={18} /> Settings
          </NavLink>

          <NavLink to="/profile" className={linkClass} onClick={handleLinkClick}>
            <UserRound size={18} /> Profile
          </NavLink>

          {/* INFO */}
          <p className="text-xs text-base-content/50 px-2 mt-4">
            INFO
          </p>

          <NavLink to="/about" className={linkClass} onClick={handleLinkClick}>
            <Info size={18} /> About
          </NavLink>

          <NavLink to="/contact" className={linkClass} onClick={handleLinkClick}>
            <Mail size={18} /> Contact
          </NavLink>

        </nav>

        {/* FOOTER */}
        <div className="text-xs text-base-content/50 px-2 mt-4">
          © {new Date().getFullYear()} CashVolt
        </div>
      </aside>
    </>
  );
};

export default Sidebar;