import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  LifeBuoy, 
  CreditCard, 
  User, 
  Zap, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "Getting Started",
    icon: Zap,
    articles: ["Setting up your first budget", "Linking bank accounts", "Dashboard overview"],
    color: "bg-amber-50"
  },
  {
    title: "Accounts & Security",
    icon: User,
    articles: ["Resetting your password", "Enabling 2FA", "Managing profile data"],
    color: "bg-blue-50"
  },
  {
    title: "Payments & Billing",
    icon: CreditCard,
    articles: ["Birres Pro features", "Subscription management", "Payment methods"],
    color: "bg-emerald-50"
  },
  {
    title: "Data & Insights",
    icon: BookOpen,
    articles: ["Exporting CSV reports", "Custom category logic", "Understanding analytics"],
    color: "bg-indigo-50"
  }
];

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* HERO & SEARCH */}
      <div className="bg-white border-b border-slate-200 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <LifeBuoy size={14} />
            Support Center
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
            How can we help?
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={22} />
            </div>
            <input 
              type="text"
              placeholder="Search for articles (e.g. 'how to link a bank')"
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 outline-none focus:border-indigo-500 transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.articles.map(article => (
                    <li key={article}>
                      <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 flex items-center justify-between group">
                        {article}
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowUpRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FEATURED FAQ SECTION */}
        <div className="mt-32">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-12">Popular Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Is Birres safe to use with my bank?",
              "What happens if I cancel my Pro subscription?",
              "How do I export data for tax purposes?",
            ].map((q, i) => (
              <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-colors">
                <span className="font-semibold text-slate-700">{q}</span>
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORT CONTACT BOX */}
        <div className="mt-32 p-12 bg-indigo-600 rounded-[3rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">Couldn't find an answer?</h2>
              <p className="text-indigo-100 text-lg">Our support team in Addis Ababa is ready to help you 24/7.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2">
                <MessageCircle size={20} />
                Live Chat
              </button>
              <button className="px-8 py-4 bg-indigo-500 text-white border border-indigo-400 rounded-2xl font-bold hover:bg-indigo-400 transition-colors">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Birres Support • All systems operational
      </footer>
    </div>
  );
};

export default HelpCenter;