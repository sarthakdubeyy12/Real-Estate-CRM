// models/Lead.js
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stage: { 
    type: String, 
    enum: ["New", "Contacted", "Site Visit", "Negotiation", "Closed", "Lost"], 
    default: "New" 
  },
  notes: String,
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);