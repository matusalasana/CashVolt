import React, { useState } from "react";
import { 
  Lock, 
  EyeOff, 
  Database, 
  UserCheck, 
  FileText, 
  Globe, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";

const policySections = [
  {
    id: "collection",
    title: "Information We Collect",
    icon: <Database className="w-5 h-5" />,
    content: "We collect information you provide directly to us, such as when you create an account, link your financial institutions, or contact support. This includes your name, email address, and encrypted transaction data."
  },
  {
    id: "usage",
    title: "How We Use Data",
    icon: <Globe className="w-5 h-5" />,
    content: "Your data is used solely to provide financial insights, track budgets, and improve app performance. We use anonymized, aggregated data to generate market trends—never to identify you personally."
  },
  {
    id: "security",
    title: "Security Measures",
    icon: <Lock className="w-5 h-5" />,
    content: "Birres employs AES-256 encryption for data at rest and TLS for data in transit. We use multi-factor authentication (MFA) options to ensure only you can access your financial vault."
  },
  {
    id: "sharing",
    title: "Third-Party Sharing",
    icon: <EyeOff className="w-5 h-5" />,
    content: "We do not sell your data. We only share information with third-party service providers (like Plaid or Salt Edge) required to sync your bank accounts, under strict confidentiality agreements."
  },
  {
    id: "rights",
    title: "Your Data Rights",
    icon: <UserCheck className="w-5 h-5" />,
    content: "You have the right to export your data, request its deletion, or correct inaccuracies at any time via your account settings or by contacting our privacy officer."
  }
];

const PrivacyPolicy: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
        <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-emerald-600 font-bold tracking-widest uppercase text-xs mb-6"
          >
            <ShieldAlert size={16} />
            <span>Privacy & Security</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6"
          >
            Your Privacy Matters.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl leading-relaxed"
          >
            At <span className="text-emerald-600 font-semibold">Birres</span>, we believe your financial data is your own. This policy outlines exactly how we protect it and your rights over that information.
          </motion.p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        
        {/* QUICK SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 bg-emerald-600 text-white rounded-[2rem] shadow-xl shadow-emerald-200">
            <h3 className="font-bold text-lg mb-2">No Selling</h3>
            <p className="text-emerald-50 opacity-90 text-sm leading-relaxed">We never sell your personal or financial data to advertisers or third parties. Period.</p>
          </div>
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Full Control</h3>
            <p className="text-slate-500 text-sm leading-relaxed">You can delete your account and all associated data at any time with a single click.</p>
          </div>
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Bank-Level</h3>
            <p className="text-slate-500 text-sm leading-relaxed">We use the same encryption standards as major global financial institutions.</p>
          </div>
        </div>

        {/* DETAILED SECTIONS */}
        <div className="space-y-12">
          {policySections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className={`group p-10 rounded-[2.5rem] transition-all duration-500 ${
                hoveredSection === section.id 
                ? 'bg-white shadow-2xl shadow-slate-200 scale-[1.02]' 
                : 'bg-transparent border border-transparent'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl transition-colors duration-500 ${
                  hoveredSection === section.id ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-slate-200 shadow-sm'
                }`}>
                  {section.icon}
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    {section.title}
                    {hoveredSection === section.id && <ArrowRight size={20} className="text-emerald-500 animate-pulse" />}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {section.content}
                  </p>
                  <p className="text-slate-400 text-sm italic">
                    Refer to Section {index + 1}.A of the full legal disclosure for technical specifications.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DATA REQUEST CALLOUT */}
        <div className="mt-20 p-1 bg-gradient-to-r from-emerald-400 to-indigo-500 rounded-[3rem]">
          <div className="bg-white rounded-[2.9rem] p-12 text-center">
            <FileText className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-slate-900 mb-4">Exercise Your Rights</h3>
            <p className="text-slate-500 max-w-xl mx-auto mb-8 text-lg">
              Want to download a copy of your data or request permanent deletion? Our automated privacy portal makes it easy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                Download My Data
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:border-rose-200 hover:text-rose-600 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            Last Updated: March 09, 2026
          </p>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Security Overview</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
