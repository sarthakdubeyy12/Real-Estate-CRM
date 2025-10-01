// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  reminderDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  description: String,
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);