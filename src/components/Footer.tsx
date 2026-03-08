 
import { Github, Twitter, Linkedin, Heart, Wallet } from 'lucide-react';
import {Link} from "react-router-dom"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 border-t border-slate-200 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900"><span className="text-indigo-600">Birres</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Managing your money has never been easier. Track, save, and grow your wealth with modern tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Expense Analytics</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Savings Goals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">
                <Link to="/terms">
                  Terms of Service
                </Link>
                </a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Connect</h4>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-indigo-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © {currentYear} Birres. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            Developed with <Heart size={12} className="text-rose-500 fill-rose-500" /> in Addis Ababa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
