import express from "express"
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categories.controller.js"
// import { authorizeRoles } from "../middleware/roleAuth.js"
import { protect} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", protect, addCategory)
router.get("/", protect, getCategories)
router.get("/:id", protect, getCategory)
router.put("/:id", protect, updateCategory)
router.delete("/:id", protect, deleteCategory)

export default router 