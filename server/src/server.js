import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
// Routes
import usersRoutes from "./routes/users.js"
import accountsRoutes from "./routes/accounts.js"
import categoriesRoutes from "./routes/categories.js"
import transactionsRoutes from "./routes/transactions.js";

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

// Middlewares 
app.use(express.json())
app.use(cors()) 

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/accounts", accountsRoutes)
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes)

// Server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});