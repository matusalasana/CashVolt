# 💰 CashVolt – Budget Tracker App

CashVolt is a full-stack personal finance management application that helps users track income, expenses, budgets, and financial insights in a clean and intuitive dashboard.

Built with modern web technologies, CashVolt provides real-time tracking, analytics, and structured financial organization for users who want better control over their money.

---

## 🚀 Live Demo

- 🌐 Frontend: https://your-frontend-url.com  
- ⚙️ Backend API: https://your-backend-url.com  

---

## 📸 Preview

> Add screenshots here (dashboard, budgets, transactions, analytics)

---

## 🧠 Features

### 💳 Accounts
- Create and manage multiple accounts (Cash, Bank, etc.)
- Track balances per account

### 📊 Transactions
- Add income and expense transactions
- Categorize spending
- Filter by date, account, and category
- Transaction history tracking

### 📦 Budgets
- Monthly budget creation per category
- Budget vs actual spending comparison
- Remaining budget tracking

### 🗂 Categories
- Income and expense category separation
- Custom category creation

### 📈 Analytics Dashboard
- Monthly and yearly summaries
- Spending breakdown by category
- Income vs expense visualization

### 🔐 Authentication
- Secure login and registration
- Protected routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- DaisyUI
- React Hook Form
- Zod (validation)
- React Query (TanStack Query)
- Axios
- Chart.js

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication

---

## 📁 Project Structure

The project follows a modular full-stack architecture with clear separation between frontend and backend.


💰 CashVolt/ │ ├── 🌐 client/                          # Frontend (React + TypeScript) │   ├── 📁 public/                      # Static assets │   ├── 📁 src/ │   │   ├── 🔌 api/                    # Axios API layer │   │   ├── 🧩 components/             # Reusable UI components │   │   │   ├── 🏦 accounts/ │   │   │   ├── 💰 budgets/ │   │   │   ├── 🗂 categories/ │   │   │   ├── 💳 transactions/ │   │   │   └── 🔧 shared/ │   │   ├── 🪝 hooks/                  # React Query hooks │   │   ├── 📄 pages/                  # App pages (Dashboard, Settings) │   │   ├── 🧠 types/                  # TypeScript types + Zod schemas │   │   ├── 🛠 utils/                  # Helper functions │   │   ├── 🌍 context/               # Global state (if any) │   │   ├── App.tsx │   │   └── main.tsx │ ├── ⚙️ server/                          # Backend (Node.js + Express) │   ├── 📁 src/ │   │   ├── 🧩 modules/               # Feature-based architecture │   │   │   ├── 🔐 auth/ │   │   │   ├── 🏦 accounts/ │   │   │   ├── 💰 budgets/ │   │   │   ├── 🗂 categories/ │   │   │   └── 💳 transactions/ │   │   ├── 🌐 routes/                # API route definitions │   │   ├── 🛡 middleware/            # Auth, error handling │   │   ├── ⚙️ config/                # Database & environment config │   │   ├── 🛠 utils/                 # Helper functions │   │   ├── app.ts │   │   └── server.ts │ ├── 🔐 .env                           # Environment variables ├── 📦 package.json                   # Project dependencies └── 📘 README.md


## below are wrong

# Static assets │   ├── src/ │   │   ├── api/                    # Axios API instances & requests │   │   ├── components/             # Reusable UI components │   │   │   ├── accounts/ │   │   │   ├── budgets/ │   │   │   ├── categories/ │   │   │   ├── transactions/ │   │   │   └── shared/ │   │   ├── hooks/                  # React Query custom hooks │   │   ├── pages/                  # Route pages (Dashboard, Settings, etc.) │   │   ├── types/                  # TypeScript types + Zod schemas │   │   ├── utils/                 # Helpers & utilities │   │   ├── context/               # Global state (if used) │   │   ├── App.tsx │   │   └── main.tsx │ ├── server/                          # Backend (Node.js + Express) │   ├── src/ │   │   ├── modules/               # Feature-based modules │   │   │   ├── auth/ │   │   │   ├── accounts/ │   │   │   ├── budgets/ │   │   │   ├── categories/ │   │   │   └── transactions/ │   │   ├── routes/                # API route definitions │   │   ├── middleware/            # Auth, error handling, etc. │   │   ├── config/                # DB & environment config │   │   ├── utils/                 # Helper functions │   │   ├── app.ts                 # Express app setup │   │   └── server.ts              # Entry point │ ├── .env                           # Environment variables ├── package.json                   # Root config (if monorepo) └── README.md
