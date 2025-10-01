import express from "express";
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} from "../controllers/propertyController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admin and Agent can manage properties
router.use(protect);
router.use(authorize("Admin", "Agent"));

router.post("/", createProperty);
router.get("/", getProperties);
router.get("/:id", getProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;