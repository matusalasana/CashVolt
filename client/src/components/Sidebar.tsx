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

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: CreditCard },
  { to: "/accounts", label: "Accounts", icon: Wallet },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/savings", label: "Savings", icon: HandCoins },
  { to: "/budgets", label: "Budgets", icon: PieChart },
  { to: "/analytics", label: "Analytics", icon: ChartColumnBig },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
    ${
      isActive
        ? "bg-primary text-primary-content"
        : "hover:bg-base-200 text-base-content/80"
    }`;

  return (
    <>
      {/* Mobile menu button - only visible on mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-10">
        <label
          htmlFor="app-drawer"
          className="btn btn-ghost btn-sm"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </label>
      </div>

      {/* Drawer overlay for mobile */}
      <div className={`fixed top-0 bottom-0 z-40 ${open ? 'visible' : 'invisible'}`}>
        {open && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          />
        )}
        
        <aside 
          className={`absolute top-0 left-0 w-72 h-full bg-base-100 border-r border-base-200 p-4 flex flex-col transition-transform duration-300 z-50
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Close button for mobile */}
          <button 
            className="lg:hidden absolute top-4 right-4 btn btn-ghost btn-sm"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg font-bold text-primary">CashVolt</h1>
            <p className="text-xs text-base-content/50">
              Budget Tracker System
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1 flex-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="text-xs text-base-content/40 border-t pt-3 mt-auto">
            © {new Date().getFullYear()} CashVolt
          </div>
        </aside>
      </div>

      {/* Desktop sidebar - always visible */}
      <aside className="hidden lg:flex w-72 h-screen sticky top-0 bg-base-100 border-r border-base-200 p-4 flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg font-bold text-primary">CashVolt</h1>
          <p className="text-xs text-base-content/50">
            Budget Tracker System
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-xs text-base-content/40 border-t pt-3 mt-auto">
          © {new Date().getFullYear()} CashVolt
        </div>
      </aside>
    </>
  );
}