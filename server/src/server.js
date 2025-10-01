import express from "express";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import { connectRedis } from "../src/config/redis.js";
import authRoutes from "../src/routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";



dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
  await connectRedis();

  app.use("/api/auth", authRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/properties", propertyRoutes);
  app.use("/api/leads", leadRoutes);
});