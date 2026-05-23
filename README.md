
# 💰 CashVolt – Personal Finance Tracker App

> A modern full-stack personal finance management platform built with the **PERN Stack**.

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

# 🚀 Tech Stack

## 🎨 Frontend
- ⚛️ React 19
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS v4
- 🎨 DaisyUI
- 🐻 Zustand
- 🔄 TanStack Query
- 📝 React Hook Form
- ✅ Zod (validation)
- ♻️ Axios
- 🎬 Framer Motion
- 📉 Chart.js

---

## 🛠️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🟦 TypeScript
- 🐘 Neon PostgreSQL
- ⚡ Redis
- 🔐 JWT Authentication
- ✅ Zod Validation
- 📜 Winston Logger

---

# ✨ Features

## 🔐 Authentication & Authorization
- JWT Authentication
- Refresh & Access Tokens
- Role-Based Access Control (RBAC)
- Secure Password Hashing
- Protected Routes
- HTTP-only Cookies

---

## 💳 Accounts
- Create and manage multiple accounts (Cash, Bank, etc.)
- Track balances per account

## 📊 Transactions
- Add income and expense transactions
- Categorize spending
- Filter by date, account, and category
- Transaction history tracking

## 📦 Budgets
- Monthly budget creation per category
- Budget vs actual spending comparison
- Remaining budget tracking

## 🗂 Categories
- Income and expense category separation
- Custom category creation

## 📈 Analytics Dashboard
- Monthly and yearly summaries
- Spending breakdown by category
- Income vs expense visualization

---

## 💻 Frontend Features
- Fully Responsive UI
- Dark / Light Mode Ready
- Smooth Animations
- Real-Time State Management
- Optimized API Fetching
- Error Boundaries
- Graphs for analytics 
- Form Validation

---

## ⚙️ Backend Features
- RESTful API
- Modular Architecture
- Rate Limiting
- Security Middleware
- Logging & Monitoring

---

# 🏗️ Tech Architecture

```bash
Frontend (React + Vite)
        ↓
API Requests (Axios + React Query)
        ↓
Backend (Express + TypeScript)
        ↓
Database (Neon PostgreSQL)
```

---

# 📁 Project Structure

```bash
CashVolt/
│
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── hooks/
│       ├── types/
│       ├── utils/
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
│    
├── server/
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── modules/
│       ├── utils/
│       ├── App.js
│       └── server.js
│
└── README.md
```

---

# ⚡ Installation

## 📥 Clone Repository

```bash
git clone git@github.com:matusalasana/CashVolt.git
```

---

## 📂 Navigate Into Project

```bash
cd CashVolt
```

---

# 🎨 Frontend Setup

## 📁 Navigate To Frontend

```bash
cd client
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🚀 Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🛠️ Backend Setup

## 📁 Navigate To Backend

```bash
cd server
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔑 Create Environment Variables

Create a `.env` file:

```env
PORT=3000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

FRONTEND_URL=your_deployed_frontend_url

FRONTEND_LOCALHOST_URL=your_frontend_localhost_url

NODE_ENV=development
```

---

## 🚀 Start Backend Development Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# 📜 Available Scripts

## 🎨 Frontend

| Script | Description |
|---|---|
| npm run dev | Start Vite development server |
| npm run build | Build frontend for production |

---

## 🛠️ Backend

| Script | Description |
|---|---|
| npm run dev | Start backend development server |

---

# 🧠 State Management

CashVolt uses modern state management solutions for scalability and performance.

## 🔄 TanStack Query
Used for:
- API Requests
- Server State
- Data Caching
- Data Synchronization

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Helmet Middleware
- Rate Limiting
- CORS Protection
- Input Validation

---

# 🌍 Deployment

Aura Commerce can be deployed on:

## 🎨 Frontend
- Vercel
- Netlify

---

## 🛠️ Backend
- Railway
- Render
- VPS
- Docker
- AWS

---

# 🚀 Performance Optimizations

- React Query Caching
- Optimized API Calls
- Bundle Optimization
- Code Splitting

---

# 🔮 Future Improvements

- 📧 Email Notifications
- 🤖 AI Insights 
- 🔔 Real-Time Notifications
- 📱 Mobile Application

---

# 📸 Screenshots (Coming soon)

- 🏠 Homepage
- 💱 Transactions Page
- 🏧 Accounts Page
- 📉 Analytics Page
- 💰 Savings Page
- 🔐 Authentication Pages

---

# 👨‍💻 Author

## Sana — Full Stack Developer

Built with passion ❤️ using modern web technologies.

---