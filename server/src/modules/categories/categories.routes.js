import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "./categories.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// protect everything
router.use(protect);

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;