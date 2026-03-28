import express from "express"
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categories.js"
const router = express.Router()

router.post("/", addCategory)
router.get("/", getCategories)
router.get("/:id", getCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router 