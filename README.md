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


## Backend Structure 
server/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── users/
│   │   │   ├── users.routes.js
│   │   │   ├── users.controller.js
│   │   │   ├── users.service.js
│   │   │   └── users.repository.js
│   │   │
│   │   ├── accounts/
│   │   │   ├── accounts.routes.js
│   │   │   ├── accounts.controller.js
│   │   │   ├── accounts.service.js
│   │   │   └── accounts.repository.js
│   │   │
│   │   ├── categories/
│   │   │   ├── categories.routes.js
│   │   │   ├── categories.controller.js
│   │   │   ├── categories.service.js
│   │   │   └── categories.repository.js
│   │   │
│   │   ├── transactions/
│   │   │   ├── transactions.routes.js
│   │   │   ├── transactions.controller.js
│   │   │   ├── transactions.service.js
│   │   │   └── transactions.repository.js
│   │   │
│   │   ├── budgets/
│   │   │   ├── budgets.routes.js
│   │   │   ├── budgets.controller.js
│   │   │   ├── budgets.service.js
│   │   │   └── budgets.repository.js
│   │   │
│   │   └── analytics/
│   │       ├── analytics.routes.js
│   │       ├── analytics.controller.js
│   │       └── analytics.service.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── hash.js
│   │   ├── response.js
│   │   └── constants.js
│   │
│   ├── shared/
│   │   ├── errors/
│   │   │   ├── AppError.js
│   │   │   └── asyncHandler.js
│   │   │
│   │   ├── helpers/
│   │   │   ├── pagination.js
│   │   │   └── date.js
│   │   │
│   │   └── enums/
│   │       ├── roles.js
│   │       └── transactionTypes.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── .env
