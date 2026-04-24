import { 
  User, 
  Wallet, 
  Bell, 
  ShieldCheck, 
  LogOut
} from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useLogout } from "../../hooks/useAuth";

const ProfileNavigations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: logout } = useLogout();

  const navItems = [
    { path: "/profile", icon: User, label: "Personal Info" },
    { path: "/profile/payment-methods", icon: Wallet, label: "Payment Methods" },
    { path: "/profile/notifications", icon: Bell, label: "Notifications" },
    { path: "/profile/security", icon: ShieldCheck, label: "Security" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <ul className="menu bg-base-100 w-full rounded-box p-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <a 
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? "active" : ""}
            >
              <item.icon size={18} /> {item.label}
            </a>
          </li>
        ))}
        <div className="divider my-1"></div>
        <li>
          <a onClick={handleLogout} className="text-error">
            <LogOut size={18} /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNavigations