import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js"; // Import your User model

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // <-- important to parse JSON

// Routes
app.use("/api", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // ✅ Insert a sample user if not already in DB
    const existingUser = await User.findOne({ email: "sample@test.com" });
    if (!existingUser) {
      const sampleUser = new User({
        name: "Sample User",
        email: "sample@test.com",
        password: "12345"
      });
      await sampleUser.save();
      console.log("✅ Sample user inserted");
    } else {
      console.log("ℹ Sample user already exists");
    }
  })
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Root route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
