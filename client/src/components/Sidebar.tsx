import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Tags,
  PieChart,
  X,
  Settings,
  Menu,
  Info,
  UserRoundSearch, 
  Goal,
  ChartColumnBig
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
      <div className="lg:hidden p-6">

        <button
          onClick={() => setOpen(true)}
          className="btn btn-ghost"
        >
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h1 className="text-xl font-bold text-primary">
              CashVolt
            </h1>
            <p className="text-xs text-base-content/60">
              Manage your money smarter
            </p>
          </div>

          {/* Close button (mobile only) */}
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">

          <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/transactions" className={linkClass} onClick={handleLinkClick}>
            <CreditCard size={20} />
            Transactions
          </NavLink>

          <NavLink to="/accounts" className={linkClass} onClick={handleLinkClick}>
            <Wallet size={20} />
            Accounts
          </NavLink>

          <NavLink to="/categories" className={linkClass} onClick={handleLinkClick}>
            <Tags size={20} />
            Categories
          </NavLink>

          <NavLink to="/budgets" className={linkClass} onClick={handleLinkClick}>
            <PieChart size={20} />
            Budgets
          </NavLink>
          
          <NavLink to="/about" className={linkClass} onClick={handleLinkClick}>
            <Info size={20} />
            About 
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={handleLinkClick}>
            <UserRoundSearch size={20} />
            Contact 
          </NavLink>
          <NavLink to="/goals" className={linkClass} onClick={handleLinkClick}>
            <Goal size={20} />
            Goals 
          </NavLink>
          <NavLink to="/analytics" className={linkClass} onClick={handleLinkClick}>
            <ChartColumnBig size={20} />
            Analytics 
          </NavLink>
          
          <NavLink to="/settings" className={linkClass} onClick={handleLinkClick}>
            <Settings size={20} />
            Settings 
          </NavLink>

        </nav>

        {/* Footer */}
        <div className="text-xs text-base-content/50 px-2 mt-4">
          © {new Date().getFullYear()} Finance App
        </div>
      </aside>
    </>
  );
};

export default Sidebar;