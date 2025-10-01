import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admin & Agent can manage tasks
router.use(protect);
router.use(authorize("Admin", "Agent"));

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;