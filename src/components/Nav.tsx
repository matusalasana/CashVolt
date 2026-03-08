import   { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Wallet, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { label: 'Dashboard', to: '/', icon: '📊' },
    { label: 'Expenses', to: '/expenses', icon: '💸' },
    { label: 'Income', to: '/income', icon: '💰' },
    { label: 'Tracker', to: '/tracker', icon: '📈' },
    { label: 'Goals', to: '/goals', icon: '🎯' },
    { label: 'About', to: '/about-us', icon: '👥' },
  ];

  const getLinkStyles = ({ isActive }) => 
    `relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive 
      ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30' 
      : 'text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-md'
    }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo with animated icon */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg text-white transform group-hover:scale-110 transition-transform">
                <Wallet size={24} />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Birres
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getLinkStyles}>
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ml-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fadeIn">
          <div className="space-y-3">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                onClick={() => setIsOpen(false)} 
                className={({ isActive }) => 
                  `w-full flex items-center justify-between p-5 rounded-2xl font-semibold text-lg transition-all ${
                    isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`
                }
              >
                <span>
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </span>
                <ChevronRight size={20} className="opacity-50" />
              </NavLink>
            ))}
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
            >
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}
      <div className="h-20" />
    </>
  );
};

export default Nav;