import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import { protect} from "./middleware/auth.js"
import transactions from "./routes/transactions.js"
import categories from "./routes/categories.js"
import accounts from "./routes/accounts.js"
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use("/api/transactions", transactions)
app.use("/api/categories", categories)
app.use("/api/accounts", accounts)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});