// models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  budget: Number,
  preferences: [String], // e.g., ["Apartment", "3BHK", "Near Metro"]
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);