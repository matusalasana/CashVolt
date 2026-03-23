import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import { protect} from "./middleware/auth.js"
import expenses from "./routes/expenses.js"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Routes
app.use("/api/expenses", expenses)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});