import express from "express";
import {
  getSavings,
  getSingleSavings,
  createSavings,
  updateSavings,
  deleteSavings
} from "./savings.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// protect everything
router.use(protect);

router.get("/", getSavings);
router.get("/:id", getSingleSavings);
router.post("/", createSavings);
router.put("/:id", updateSavings);
router.delete("/:id", deleteSavings);

export default router;