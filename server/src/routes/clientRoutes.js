import express from "express";
import {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient
} from "../controllers/clientController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admin and Agent can manage clients
router.use(protect);
router.use(authorize("Admin", "Agent"));

router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;