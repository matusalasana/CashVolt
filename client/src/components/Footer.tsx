import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary">CashVolt ⚡</h2>
            <p className="text-sm text-gray-500">
              Smart budgeting made simple. Track, save, and grow your money with confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a className="hover:text-primary cursor-pointer">Dashboard</a></li>
              <li><a className="hover:text-primary cursor-pointer">Budgets</a></li>
              <li><a className="hover:text-primary cursor-pointer">Analytics</a></li>
              <li><a className="hover:text-primary cursor-pointer">Goals</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a className="hover:text-primary cursor-pointer">About</a></li>
              <li><a className="hover:text-primary cursor-pointer">Contact</a></li>
              <li><a className="hover:text-primary cursor-pointer">Privacy Policy</a></li>
              <li><a className="hover:text-primary cursor-pointer">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <a className="btn btn-sm btn-ghost rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a className="btn btn-sm btn-ghost rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a className="btn btn-sm btn-ghost rounded-full">
                <Linkedin className="w-5 h-5" />
              </a>
              <a className="btn btn-sm btn-ghost rounded-full">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="divider my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CashVolt. All rights reserved.</p>
          <p>Built with ⚡ for smarter financial management</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;