import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  console.log("🚀 Received signup request:", req.body); // Log request body

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log("🔍 Existing user:", existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Hashed password:", hashedPassword);

    const user = await User.create({ name, email, password: hashedPassword });
    console.log("✅ User created:", user);

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("🚀 Received login request:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("🔍 Found user:", user);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    console.log("✅ Password match:", match);

    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("🔑 JWT token generated:", token);

    res.json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
