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



categories are user-specific
→ user_id protects data
→ no user can see another user’s categories



Perfect — this is exactly what you need now: a clear step-by-step roadmap so you stop feeling lost.

I’ll give you a real developer workflow (what to build, in order, and how to test each step).


---

🧠 OVERALL PLAN

1. Setup + Health check
2. Auth (register/login)
3. Auth middleware (protect routes)
4. Users (getMe, update)
5. Accounts
6. Categories
7. Transactions
8. Budgets
9. Validation + error handling

👉 You already built parts — now we organize + test properly.


---

🚀 STEP-BY-STEP BACKEND ROADMAP


---

✅ STEP 1: Server Setup (BASE)

Do:

app.js

server.js

DB connection


Test:

👉 Open browser / Postman:

GET /health

Response:

{ "message": "API is running" }

✔ If this works → move on


---

🔐 STEP 2: AUTH (REGISTER + LOGIN)

Build:

auth.controller.js

auth.service.js

auth.repository.js

auth.routes.js



---

Endpoints:

POST /auth/register
POST /auth/login
POST /auth/logout


---

Test (VERY IMPORTANT)

1. Register

POST /auth/register

{
  "first_name": "Sana",
  "last_name": "Ali",
  "email": "test@gmail.com",
  "password": "123456"
}

✔ Should create user


---

2. Login

POST /auth/login

{
  "email": "test@gmail.com",
  "password": "123456"
}

✔ Should return:

user

cookie (token)



---

🛡️ STEP 3: AUTH MIDDLEWARE

Build:

middlewares/auth.middleware.js

👉 verify JWT
👉 attach req.user


---

Test:

Add route:

GET /test-protected

router.get("/test-protected", protect, (req, res) => {
  res.json(req.user);
});


---

Test:

👉 Call without token → ❌ should fail
👉 Call after login → ✅ should work


---

👤 STEP 4: USER (GET ME)

Build:

GET /auth/me


---

Test:

GET /auth/me

✔ Should return logged-in user


---

💳 STEP 5: ACCOUNTS

Build:

create account

get accounts

update

delete



---

Endpoints:

GET /accounts
POST /accounts
PUT /accounts/:id
DELETE /accounts/:id


---

Test:

Create:

{
  "name": "Main"
}

✔ Should save with user_id


---

🏷️ STEP 6: CATEGORIES

Build:

create category

get categories

filter by type



---

IMPORTANT LOGIC:

type = "income" | "expense"


---

Test:

POST /categories

{
  "name": "Food",
  "type": "expense"
}

✔ Then:

GET /categories?type=expense


---

💸 STEP 7: TRANSACTIONS (BIG ONE)

Build:

create transaction

get all

filter by type

update

delete



---

Test carefully:

Create:

{
  "amount": 100,
  "description": "Lunch",
  "account_id": 1,
  "category_id": 2,
  "transaction_date": "2026-04-04"
}


---

Get:

GET /transactions
GET /transactions?type=expense

✔ Should show:

account_name

category_name

type



---

💰 STEP 8: BUDGETS

Build:

monthly budget per category



---

Test:

POST /budgets

{
  "category_id": 2,
  "amount": 500,
  "month": "2026-04-01"
}


⚠️ STEP 9: VALIDATION + ERROR HANDLING

Add:
validate middleware
global error handler


🧪 HOW TO TEST EVERYTHING (IMPORTANT)
use api tester app



Testing order (DON’T SKIP)

1. Register user
2. Login user
3. Copy cookie/token
4. Test protected route
5. Create account
6. Create category
7. Create transaction
8. Fetch transactions