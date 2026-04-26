import {
  User,
  Wallet,
  Bell,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

const ProfileNavigations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: logout } = useLogout();

  const navItems = [
    {
      section: "ACCOUNT",
      items: [
        { path: "/profile", icon: User, label: "Personal Info" },
        { path: "/profile/payment-methods", icon: Wallet, label: "Payment Methods" },
      ],
    },
    {
      section: "PREFERENCES",
      items: [
        { path: "/profile/notifications", icon: Bell, label: "Notifications" },
      ],
    },
    {
      section: "SECURITY",
      items: [
        { path: "/profile/security", icon: ShieldCheck, label: "Security" },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="card bg-base-100 shadow-xl p-2">

      <ul className="menu w-full">

        {/* GROUPED NAV */}
        {navItems.map((group) => (
          <div key={group.section} className="mb-3">

            <p className="text-xs text-base-content/50 px-2 mt-2">
              {group.section}
            </p>

            {group.items.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </div>
        ))}

        {/* DIVIDER */}
        <div className="divider my-1"></div>

        {/* LOGOUT */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-error hover:bg-error/10 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
};

export default ProfileNavigations;