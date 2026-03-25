import { getCategories } from "../controllers/categories.js"
import express from "express"

const router = express.Router()

router.get("/", getCategories)

export default router