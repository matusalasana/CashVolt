import { Link } from "react-router-dom";
import { Send, Mail, Code, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary">
              CashVolt ⚡
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Smart budgeting made simple. Track your spending, save more,
              and grow your financial confidence.
            </p>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/budgets" className="hover:text-primary transition">
                  Budgets
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-primary transition">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/goals" className="hover:text-primary transition">
                  Goals
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/developers" className="hover:text-primary transition">
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>

            <div className="flex gap-3">
              <a
                href="https://t.me/sana1514"
                className="btn btn-sm btn-ghost rounded-full hover:scale-105 transition"
              >
                <Send className="w-5 h-5" />
              </a>

              <a
                href="mailto: matusalasana@gmail.com"
                className="btn btn-sm btn-ghost rounded-full hover:scale-105 transition"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-ghost rounded-full hover:scale-105 transition"
              >
                <Github className="w-5 h-5" />
              </a>
              
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-ghost rounded-full hover:scale-105 transition"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="divider my-10"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CashVolt. All rights reserved.</p>
          <p>Built with ⚡ for smarter financial management</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;