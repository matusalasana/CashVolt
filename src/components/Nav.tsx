import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Menu, X, ChevronRight } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Expenses', to: '/expenses' },
    { label: 'Income', to: '/income' },
    { label: 'Tracker', to: '/tracker' },
    { label: 'Goals', to: '/goals' },
    { label: 'About Us', to: '/about-us' },
  ];

  // Logic to handle class names dynamically
  const getLinkStyles = ({ isActive }) => 
    `px-4 py-2 rounded-xl text-sm font-bold transition-all ${
      isActive 
      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`;

  const getMobileStyles = ({ isActive }) =>
    `w-full flex items-center justify-between p-5 rounded-2xl font-bold text-lg transition-all ${
      isActive 
      ? 'bg-indigo-600 text-white shadow-xl' 
      : 'bg-slate-50 text-slate-600'
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><Wallet size={20} /></div>
            <span className="text-xl font-black text-indigo-600">Birres</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getLinkStyles}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 bg-slate-50 rounded-xl">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="space-y-3">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                onClick={() => setIsOpen(false)} 
                className={getMobileStyles}
              >
                {item.label}
                <ChevronRight size={20} />
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <div className="h-16" />
    </>
  );
};

export default Nav;
