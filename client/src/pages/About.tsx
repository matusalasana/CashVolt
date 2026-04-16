import { Wallet, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">About CashVolt ⚡</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          CashVolt is a modern budget tracking app designed to help you take
          control of your money, build better habits, and grow your financial future.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="card bg-base-100 shadow-xl p-6">
          <Zap className="w-8 h-8 text-yellow-500 mb-3" />
          <h2 className="text-xl font-semibold">Fast & Simple Tracking</h2>
          <p className="text-gray-500 mt-2">
            Add income and expenses in seconds. No complexity, just clean and fast budgeting.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
          <h2 className="text-xl font-semibold">Smart Analytics</h2>
          <p className="text-gray-500 mt-2">
            Visualize your spending habits with powerful charts and insights.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <Wallet className="w-8 h-8 text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold">Budget Control</h2>
          <p className="text-gray-500 mt-2">
            Set monthly budgets and track your progress in real time.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <ShieldCheck className="w-8 h-8 text-purple-500 mb-3" />
          <h2 className="text-xl font-semibold">Secure & Private</h2>
          <p className="text-gray-500 mt-2">
            Your financial data stays protected and private at all times.
          </p>
        </div>

      </div>

      {/* Mission */}
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-gray-500 max-w-3xl mx-auto">
          At CashVolt, we believe financial clarity should be simple and accessible
          to everyone. Our mission is to help students, professionals, and anyone
          build better financial habits without stress or confusion.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="text-center">
        <h3 className="text-xl font-semibold">Start controlling your money today ⚡</h3>
        <p className="text-gray-500 mt-2">
          CashVolt makes budgeting effortless, fast, and insightful.
        </p>
      </div>

    </div>
  );
};

export default About;