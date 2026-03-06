import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Plus, CreditCard, TrendingDown, ArrowRight, X } from 'lucide-react';

const CallForExpenseBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 space-y-3 animate-slideUp">
          {/* Quick Expense Option */}
          <Link to="/expenses">
            <button className="group flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-x-1">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                <TrendingDown className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Quick Add</p>
                <p className="font-bold">Add Expense</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* View All Expenses Option */}
          <Link to="/expenses">
            <button className="group flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-x-1">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <CreditCard className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">View All</p>
                <p className="font-bold">Transaction History</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full animate-gradient-x"></div>
        
        {/* Pulse Ring */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-30'
        }`} style={{
          boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.5)'
        }}></div>

        {/* Inner Glow */}
        <div className={`absolute inset-2 bg-white rounded-full blur-md transition-opacity duration-300 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}></div>

        {/* Button Content */}
        <div className={`relative w-16 h-16 flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'rotate-45' : ''
        }`}>
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <>
              <Plus className={`w-8 h-8 text-white transition-all duration-300 ${
                isHovered ? 'rotate-90 scale-110' : ''
              }`} />
              
              {/* Mini Plus Icons */}
              <div className={`absolute -top-1 -right-1 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}>
                <div className="w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Plus size={10} className="text-white" />
                </div>
              </div>
              <div className={`absolute -bottom-1 -left-1 transition-all duration-300 delay-100 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <Plus size={10} className="text-white" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Ripple Effect on Click */}
        <div className={`absolute inset-0 rounded-full bg-white transition-all duration-500 ${
          isHovered ? 'scale-0 opacity-0' : 'scale-0'
        }`}></div>
      </button>

      {/* Tooltip */}
      <div className={`absolute right-20 bottom-6 transition-all duration-300 ${
        isHovered && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl">
          Quick Expense Entry
          <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 border-8 border-transparent border-l-slate-900"></div>
        </div>
      </div>
    </div>
  );
};

export default CallForExpenseBtn;