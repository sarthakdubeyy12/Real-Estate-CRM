import express from "express";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
} from "../controllers/leadController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admin and Agent can manage leads
router.use(protect);
router.use(authorize("Admin", "Agent"));

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;