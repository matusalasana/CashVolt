import express from "express"
import {
  getAllIncome,
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome
} from "../controllers/productController.js"
const router = express.Router()

router.get("/", getAllIncome)
router.get("/:id", getIncome)
router.post("/", addIncome)
router.put("/:id", updateIncome)
router.delete("/:id", deleteIncome)

export default router