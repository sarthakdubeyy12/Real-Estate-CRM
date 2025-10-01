// models/Property.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Apartment", "Villa", "Land"], required: true },
  price: Number,
  location: String,
  status: { type: String, enum: ["Available", "Sold"], default: "Available" },
  images: [String], // Cloudinary URLs
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);