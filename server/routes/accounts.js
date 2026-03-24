import { getAccounts } from "../controllers/accounts.js"
import express from "express"

const router = express.Router()

router.get("/", getAccounts)

export default router