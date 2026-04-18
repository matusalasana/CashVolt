import React from "react";

const AboutDevelopers = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">About the Developers</h1>

      <p className="mb-6">
        CashVolt is built by a passionate developer focused on simplifying
        personal finance management for students and everyday users.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
          <div className="relative flex justify-center mb-5">
            <h2 className="text-xl font-semibold mb-2">
              Sana Matusala 
            </h2>
            <p className="text-sm absolute top-6">
              (Lead Developer) 
            </p>
          </div>
          <p className="text-sm mt-2">
            Full-stack developer specializing in React, Node.js, and modern web
            applications. Focused on building clean, scalable, and user-friendly
            financial tools.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Project Vision</h2>
          <p className="text-sm">
            CashVolt was created to help users gain full control over their
            money. The goal is to make budgeting simple, visual, and intuitive
            without unnecessary complexity.
          </p>
        </div>
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
        <ul className="list-disc ml-6">
          <li>React + TypeScript</li>
          <li>Node.js + Express</li>
          <li>PostgreSQL</li>
          <li>Tailwind CSS</li>
          <li>REST API Architecture</li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-10">
        Built with ❤️ for better financial habits.
      </p>
    </div>
  );
};

export default AboutDevelopers;