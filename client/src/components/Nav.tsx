import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Wallet, Menu, X, PlusCircle, LayoutDashboard, History, PiggyBank } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', to: '/', icon: <LayoutDashboard size={18} /> },
    { label: 'Transaction History', to: '/transaction-history', icon: <History size={18} /> },
    { label: 'Savings', to: '/savings', icon: <PiggyBank size={18} /> },
  ];

  const getLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive 
        ? 'bg-primary text-primary-content shadow-md' 
        : 'hover:bg-base-200 text-base-content/70'
    }`;

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Main Navbar */}
      <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 md:px-8">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-xl text-primary-content group-hover:scale-105 transition-transform">
              <Wallet size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">CashVolt</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex-none hidden md:flex items-center gap-1">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={getLinkStyles}>
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="divider divider-horizontal mx-1"></div>
          <button className="btn btn-primary btn-sm rounded-lg shadow-sm">
            <PlusCircle size={18} />
            <span>Add</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex-none md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn btn-ghost btn-square"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-base-100 p-6 md:hidden animate-in slide-in-from-top duration-300">
          <ul className="menu bg-base-200 w-full rounded-box p-4 gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-4 p-4 text-lg ${isActive ? 'active' : ''}`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button 
            className="btn btn-primary w-full mt-6 gap-2 h-14 text-lg"
            onClick={() => setIsOpen(false)}
          >
            <PlusCircle size={20} />
            Add New Transaction
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
