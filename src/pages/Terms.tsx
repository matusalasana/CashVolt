import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wallet, PieChart, Bell, Lock, Mail, ChevronRight } from 'lucide-react';

const Terms = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { 
      id: "introduction", 
      title: "1. Welcome to Birres", 
      icon: <Wallet className="w-5 h-5" />,
      content: "Birres provides a digital platform designed to help you track expenses, manage budgets, and gain insights into your financial habits. By creating an account, you agree to provide accurate financial information for the best experience." 
    },
    { 
      id: "data-privacy", 
      title: "2. Financial Data Privacy", 
      icon: <Lock className="w-5 h-5" />,
      content: "At Birres, your security is our priority. We use industry-standard encryption to protect your linked bank accounts and manual entries. We do not sell your personal financial data to third-party advertisers." 
    },
    { 
      id: "subscriptions", 
      title: "3. Premium Subscriptions", 
      icon: <PieChart className="w-5 h-5" />,
      content: "While Birres offers a free tier, certain advanced analytics and automated syncing features require a 'Birres Pro' subscription. Fees are non-refundable unless required by law." 
    },
    { 
      id: "notifications", 
      title: "4. Alerts & Notifications", 
      icon: <Bell className="w-5 h-5" />,
      content: "By using Birres, you consent to receiving budget alerts, overspending notifications, and weekly summaries. You can customize these preferences in your account settings at any time." 
    },
    { 
      id: "liability", 
      title: "5. Financial Disclaimer", 
      icon: <ShieldCheck className="w-5 h-5" />,
      content: "Birres is a tool for informational purposes only. We are not certified financial planners. Any financial decisions made based on Birres data are at your own risk." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-emerald-100">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto py-16 px-6 text-center">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">Legal Center</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about using <span className="text-emerald-600 font-semibold">Birres</span> to master your money.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6 lg:flex gap-12">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8 space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">On this page</p>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === s.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {s.title.split('. ')[1]}
                <ChevronRight className={`w-4 h-4 ${activeSection === s.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl space-y-12">
          {sections.map((section) => (
            <section 
              id={section.id} 
              key={section.id} 
              className="scroll-mt-12 group"
              onMouseEnter={() => setActiveSection(section.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-7">
                <p>{section.content}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. 
                  Aliquam erat volutpat. Donec eu sem vitae arcu maximus pretium.
                </p>
              </div>
            </section>
          ))}

          {/* Contact Footer */}
          <div className="mt-16 p-8 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Still have questions?</h3>
              <p className="text-emerald-100 opacity-80">We're here to help you secure your financial future.</p>
            </div>
            <a 
              href="mailto:legal@birres.com"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
            >
              <Mail className="w-5 h-5" />
              Contact Legal
            </a>
          </div>
          
          <p className="text-center text-slate-400 text-sm pb-12">
            Last updated: March 2026 • © {new Date().getFullYear()} Birres Inc.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Terms;
