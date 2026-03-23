import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Test route
app.use("/", (req, res) => {
  res.send("Hello from the backend")
})


app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});