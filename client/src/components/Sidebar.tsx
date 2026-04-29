import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, CreditCard, Wallet, Tags, PieChart,
  Settings, Menu, Info, HandCoins, Zap, ChartColumnBig,
  UserRound, Mail, X, User
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

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
  const { data: user } = useAuth();

  const SidebarContent = () => (
    <>
      {/* BRAND */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="btn btn-primary btn-square btn-sm shadow-md">
          <Zap size={18} className="text-amber-500" />
        </div>

        <div className="leading-tight">
          <h1 className="text-lg font-bold tracking-tight">
            CashVolt
          </h1>
          <p className="text-[11px] text-base-content opacity-50 tracking-widest">
            Clarity in every transaction
          </p>
        </div>
      </div>

      {/* NAV */}
      <nav className="menu menu-sm px-0 gap-1 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative
              ${isActive
                ? "bg-primary text-primary-content shadow-sm"
                : "hover:bg-base-200"}`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full" />
                )}

                <Icon size={18} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* USER CARD */}
      <div className="mt-auto pt-5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/60 border border-base-300/40 backdrop-blur-md">
          
          {/* Avatar */}
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              className="w-10 h-10 rounded-xl object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User size={18} />
            </div>
          )}

          {/* Name */}
          <div className="leading-tight">
            <p className="text-sm font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-[11px] opacity-50">Active user</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden btn btn-circle btn-primary fixed top-4 left-4 z-50 shadow-lg"
      >
        <Menu size={18} />
      </button>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-base-100 p-5 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="btn btn-sm btn-circle absolute top-3 right-3"
          >
            <X size={16} />
          </button>

          <SidebarContent />
        </aside>
      </div>

      {/* DESKTOP */}
      <aside className="hidden lg:flex w-72 h-screen sticky top-0 bg-base-100 border-r border-base-200 p-5 flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}