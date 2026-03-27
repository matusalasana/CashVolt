import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
// import categoriesRoutes from "./routes/categories.js"
import cors from "cors"
import transactionsRoutes from "./routes/transactions.js";
import usersRoutes from "./routes/users.js"



dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors()) // A middleware that is like trust bridge b/n server & client side

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);
// app.use("/api/categories", categoriesRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});