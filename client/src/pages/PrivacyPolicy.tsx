import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Welcome to <strong>CashVolt</strong>. Your privacy is important to us,
        and this Privacy Policy explains how we collect, use, and protect your
        information when you use our budget tracking application.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Account information (name, email address)</li>
        <li>Financial data you input (transactions, budgets, goals)</li>
        <li>Usage data (app interactions, device information)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and maintain the app functionality</li>
        <li>To improve user experience and performance</li>
        <li>To store and organize your financial records</li>
        <li>To ensure account security</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Storage & Security</h2>
      <p className="mb-4">
        Your data is stored securely using industry-standard practices. We take
        reasonable measures to protect your information from unauthorized access,
        loss, or misuse.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Sharing</h2>
      <p className="mb-4">
        We do not sell, trade, or rent your personal data. Your information is
        only used within the CashVolt system to provide core features.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your personal data</li>
        <li>Update or correct your information</li>
        <li>Request deletion of your account and data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services (such as authentication or hosting
        providers). These services have their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, you can contact us
        at:
        <br />
        <span className="font-medium">support@cashvolt.app</span>
      </p>

      <p className="text-sm text-gray-500 mt-10">
        Last updated: April 2026
      </p>
    </div>
  );
};

export default PrivacyPolicy;