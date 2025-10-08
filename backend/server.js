import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // <-- important to parse JSON

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

  // server.js
app.get("/", (req, res) => {
  res.send("Backend is working");
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
