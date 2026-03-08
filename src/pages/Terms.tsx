import   { useState, useEffect } from "react";
import {
  ShieldCheck,
  Wallet,
  PieChart,
  Bell,
  Lock,
  Mail,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "introduction",
    title: "1. Welcome to Birres",
    icon: <Wallet className="w-5 h-5" />,
    content:
      "Birres provides a digital platform designed to help you track expenses, manage budgets, and gain insights into your financial habits.",
  },
  {
    id: "data-privacy",
    title: "2. Financial Data Privacy",
    icon: <Lock className="w-5 h-5" />,
    content:
      "Your security is our priority. Birres uses industry-standard encryption to protect your financial data. We never sell your data to advertisers.",
  },
  {
    id: "subscriptions",
    title: "3. Premium Subscriptions",
    icon: <PieChart className="w-5 h-5" />,
    content:
      "Birres offers both a free plan and a premium 'Birres Pro' subscription that unlocks advanced analytics and automated syncing.",
  },
  {
    id: "notifications",
    title: "4. Alerts & Notifications",
    icon: <Bell className="w-5 h-5" />,
    content:
      "Birres may send alerts regarding budgets, unusual spending activity, and weekly financial summaries.",
  },
  {
    id: "liability",
    title: "5. Financial Disclaimer",
    icon: <ShieldCheck className="w-5 h-5" />,
    content:
      "Birres is for informational purposes only and does not provide financial advice.",
  },
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 blur-2xl opacity-70"></div>

        <div className="relative max-w-7xl mx-auto py-20 px-6 text-center">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">
            Legal Center
          </span>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about using{" "}
            <span className="text-emerald-600 font-semibold">Birres</span>.
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-16 lg:flex gap-12">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-10">

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              On this page
            </p>

            <div className="relative">

              {/* progress line */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-200">
                <div
                  className="bg-emerald-500 w-full transition-all"
                  style={{
                    height: `${
                      (sections.findIndex((s) => s.id === activeSection) + 1) *
                      20
                    }%`,
                  }}
                />
              </div>

              <div className="space-y-1 pl-4">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() =>
                      document
                        .getElementById(s.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition ${
                      activeSection === s.id
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {s.title.split(". ")[1]}

                    <ChevronRight
                      className={`w-4 h-4 ${
                        activeSection === s.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 max-w-3xl space-y-20">

          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  {section.icon}
                </div>

                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <p className="text-slate-600 leading-7">
                {section.content}
              </p>

              <p className="text-slate-500 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque habitant morbi tristique senectus et netus.
              </p>
            </motion.section>
          ))}

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-20 p-10 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-bold">Still have questions?</h3>
              <p className="text-emerald-100">
                We're here to help you secure your financial future.
              </p>
            </div>

            <a
              href="mailto:legal@birres.com"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-6 py-3 rounded-xl font-bold transition shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Contact Legal
            </a>
          </motion.div>

          {/* FOOTER */}
          <p className="text-center text-slate-400 text-sm pb-16">
            Last updated: March 2026 • © {new Date().getFullYear()} Birres Inc.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Terms;