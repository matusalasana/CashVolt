import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>CashVolt</strong>. By using this application, you agree
        to the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of the Service</h2>
      <p className="mb-4">
        CashVolt provides personal finance tracking tools including budgets,
        transactions, accounts, and analytics. You agree to use the app only for
        lawful and personal financial management purposes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. User Accounts</h2>
      <p className="mb-4">
        You are responsible for maintaining the security of your account
        credentials. Any activity under your account is your responsibility.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Accuracy</h2>
      <p className="mb-4">
        You are responsible for the accuracy of the financial data you input.
        CashVolt does not guarantee financial outcomes based on your entries.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Prohibited Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Using the app for illegal activities</li>
        <li>Attempting to hack, reverse engineer, or disrupt the system</li>
        <li>Sharing false or misleading financial data intentionally</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Limitation of Liability</h2>
      <p className="mb-4">
        CashVolt is provided "as is" without warranties of any kind. We are not
        responsible for financial losses or decisions made using the app.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Continued use of the app
        means you accept the updated Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact</h2>
      <p className="mb-4">
        If you have questions about these Terms, contact us at:
        <br />
        <span className="font-medium">support@cashvolt.app</span>
      </p>

      <p className="text-sm text-gray-500 mt-10">
        Last updated: April 2026
      </p>
    </div>
  );
};

export default TermsOfService;