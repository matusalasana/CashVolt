import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import { protect} from "./middleware/auth.js"
import categoriesRoutes from "./routes/categories.js"
import cors from "cors"
import transactionsRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js";




dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});