import { Wallet, Zap, TrendingUp, ShieldCheck, Database } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">

      {/* HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">About CashVolt ⚡</h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          CashVolt is a full-stack personal finance system built around real
          financial data relationships — not just a UI tracker. Every feature
          is powered by transactions as the single source of truth.
        </p>
      </div>

      {/* CORE IDEA */}
      <div className="card bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Core Principle</h2>
        <p className="text-gray-500">
          <b>Transactions are the source of truth.</b> Everything else
          (budgets, savings, analytics, balances) is derived from them.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="card bg-base-100 shadow-xl p-6">
          <Zap className="w-8 h-8 text-yellow-500 mb-3" />
          <h2 className="text-xl font-semibold">Instant Transaction System</h2>
          <p className="text-gray-500 mt-2">
            Every income, expense, or savings action updates your financial
            state in real time through structured database relationships.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
          <h2 className="text-xl font-semibold">Derived Analytics Engine</h2>
          <p className="text-gray-500 mt-2">
            Charts and insights are not stored — they are calculated from
            live transaction data using aggregation logic.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <Wallet className="w-8 h-8 text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold">Multi-Account System</h2>
          <p className="text-gray-500 mt-2">
            Users can simulate real financial environments with multiple
            accounts, categories, and controlled budgets.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <Database className="w-8 h-8 text-indigo-500 mb-3" />
          <h2 className="text-xl font-semibold">Relational Data Design</h2>
          <p className="text-gray-500 mt-2">
            Built on PostgreSQL with proper relationships between users,
            accounts, transactions, categories, and savings goals.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <ShieldCheck className="w-8 h-8 text-purple-500 mb-3" />
          <h2 className="text-xl font-semibold">Data Integrity First</h2>
          <p className="text-gray-500 mt-2">
            The system is designed to prevent data duplication — every value
            is either stored once or derived from transactions.
          </p>
        </div>

      </div>

      {/* SYSTEM DESIGN */}
      <div className="card bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-3 text-center">
          How CashVolt Works
        </h2>

        <ul className="space-y-2 text-gray-500 text-sm">
          <li>• Users create accounts (wallets, banks, cash)</li>
          <li>• Every financial action becomes a transaction</li>
          <li>• Categories classify spending behavior</li>
          <li>• Savings goals track progress via linked transactions</li>
          <li>• Budgets are enforced per category per month</li>
          <li>• Analytics are computed, not stored</li>
        </ul>
      </div>

      {/* MISSION */}
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Mission</h2>
        <p className="text-gray-500 max-w-3xl mx-auto">
          To help users understand their money through structure, not
          guesswork — by turning raw transactions into meaningful financial
          insights and habits.
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-center">
        <h3 className="text-xl font-semibold">
          Built like a real financial system, not just a tracker ⚡
        </h3>
        <p className="text-gray-500 mt-2">
          Clean architecture. Real relationships. Real insights.
        </p>
      </div>

    </div>
  );
};

export default About;