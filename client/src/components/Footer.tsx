import { Link } from "react-router-dom";
import { Send, Mail, Code, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary">
              CashVolt ⚡
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed">
              A personal finance system that helps you track money flow,
              control spending, and build savings habits with clarity.
            </p>
          </div>

          {/* SYSTEM MODULES */}
          <div>
            <h3 className="font-semibold mb-4">System</h3>
            <ul className="space-y-2 text-sm text-gray-500">

              <li>
                <Link to="/" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/transactions" className="hover:text-primary">
                  Transactions
                </Link>
              </li>

              <li>
                <Link to="/accounts" className="hover:text-primary">
                  Accounts
                </Link>
              </li>

              <li>
                <Link to="/budgets" className="hover:text-primary">
                  Budgets
                </Link>
              </li>

              <li>
                <Link to="/savings" className="hover:text-primary">
                  Savings
                </Link>
              </li>

              <li>
                <Link to="/analytics" className="hover:text-primary">
                  Analytics
                </Link>
              </li>

            </ul>
          </div>

          {/* INFO */}
          <div>
            <h3 className="font-semibold mb-4">Info</h3>
            <ul className="space-y-2 text-sm text-gray-500">

              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>

              <li>
                <Link to="/developers" className="hover:text-primary">
                  Developers
                </Link>
              </li>

            </ul>
          </div>

          {/* YOU (REAL PERSONAL BRANDING) */}
          <div>
            <h3 className="font-semibold mb-4">Developer</h3>

            <p className="text-sm text-gray-500 mb-3">
              Built by Sana — full-stack developer focused on fintech systems
              and clean UI architecture.
            </p>

            <div className="flex gap-3">
              <a
                href="mailto:matusalasana@gmail.com"
                className="btn btn-sm btn-ghost rounded-full"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="https://github.com"
                className="btn btn-sm btn-ghost rounded-full"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://t.me/sana1514"
                className="btn btn-sm btn-ghost rounded-full"
              >
                <Send className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="btn btn-sm btn-ghost rounded-full"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="divider my-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} CashVolt</p>
          <p>Designed for real-world financial tracking systems ⚡</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;