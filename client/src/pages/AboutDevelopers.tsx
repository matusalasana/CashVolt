const AboutDevelopers = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        About CashVolt & The Developer
      </h1>

      <p className="mb-6 text-base leading-relaxed">
        CashVolt is a full-stack personal finance system built to help users
        understand, control, and optimize their money flow — not just track it.
        It goes beyond simple budgeting by connecting <b>transactions,
        accounts, categories, and savings goals into one unified system</b>.
      </p>

      {/* DEVELOPER SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold mb-3">
            Sana Matusala
          </h2>

          <p className="text-sm leading-relaxed">
            I’m a full-stack developer focused on building systems, not just UI.
            CashVolt was built from scratch to simulate real financial behavior:
            every transaction affects accounts, budgets, and savings goals in real time.
          </p>

          <p className="text-sm mt-3 leading-relaxed">
            The goal was not just to make a budget app — but to design a
            <b> data-driven financial engine</b> where money flow is structured,
            traceable, and meaningful.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold mb-3">
            Project Vision
          </h2>

          <p className="text-sm leading-relaxed">
            Most finance apps only store numbers. CashVolt models real-world
            financial relationships:
          </p>

          <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
            <li>Accounts represent real wallets or banks</li>
            <li>Transactions represent real money movement</li>
            <li>Categories organize spending behavior</li>
            <li>Savings goals track progress over time</li>
            <li>Budgets enforce financial discipline monthly</li>
          </ul>

          <p className="text-sm mt-3">
            The system is designed to help users not just record money — but
            actually understand their financial habits.
          </p>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE */}
      <div className="mt-10 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-3">
          Core System Architecture
        </h2>

        <p className="text-sm mb-3">
          CashVolt is built around a relational financial model:
        </p>

        <ul className="list-disc ml-6 text-sm space-y-1">
          <li><b>Users</b> → own everything</li>
          <li><b>Accounts</b> → money containers (bank, cash, card)</li>
          <li><b>Transactions</b> → source of truth for all money movement</li>
          <li><b>Categories</b> → behavior classification</li>
          <li><b>Savings</b> → goals derived from transactions</li>
          <li><b>Budgets</b> → monthly spending limits</li>
        </ul>

        <p className="text-sm mt-4">
          The key design decision: <b>money is never duplicated — it is derived
          from transactions</b>. Everything else is a projection of that truth.
        </p>
      </div>

      {/* TECH STACK */}
      <div className="mt-10 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-3">Technology Stack</h2>

        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>React + TypeScript (frontend system UI)</li>
          <li>Node.js + Express (API layer)</li>
          <li>PostgreSQL (relational financial data model)</li>
          <li>React Query (server state synchronization)</li>
          <li>Tailwind CSS (UI system design)</li>
        </ul>
      </div>

      {/* CLOSING */}
      <p className="text-sm text-gray-500 mt-10">
        CashVolt is built as a learning project, but designed like a real
        production finance system — focusing on structure, correctness, and
        real-world data relationships over simple UI.
      </p>
    </div>
  );
};

export default AboutDevelopers;