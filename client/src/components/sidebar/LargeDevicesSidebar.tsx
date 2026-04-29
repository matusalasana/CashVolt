import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, CreditCard, Wallet, Tags, PieChart,
  Settings, Info, HandCoins, Zap, ChartColumnBig,
  UserRound, Mail, User
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

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

const LargeDevicesSidebar = () => {
  const { data: user } = useAuth();
  
  return (
    <aside className="hidden lg:flex lg:flex-col h-screen sticky top-0 w-72 bg-base-100 p-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="btn btn-primary btn-square btn-sm shadow-md">
          <Zap size={18} className="text-amber-500" />
        </div>
        <div className="leading-tight">
          <h1 className="text-lg font-bold tracking-tight">CashVolt</h1>
          <p className="text-[11px] text-base-content opacity-50 tracking-widest">
            Clarity in every transaction
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="menu menu-sm flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative
              ${
                isActive
                  ? "bg-primary text-primary-content shadow-sm"
                  : "hover:bg-base-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
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

      {/* User Section */}
      <div className="mt-4 flex gap-3 justify-center items-center pt-4 border-t border-base-200">
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
        <p className="text-base-content font-semibold">
          {user?.name || "Sana Matusala"}
        </p>
      </div>
    </aside>
  );
};

export default LargeDevicesSidebar;