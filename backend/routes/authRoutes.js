import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/sync", authMiddleware, async (req, res) => {
  try {
    // User already fetched by middleware
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Sync failed" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Add this route BEFORE the authMiddleware routes
router.post("/register", async (req, res) => {
  try {
    const { firebaseUid, email, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.create({
        firebaseUid,
        email,
        name: name || email.split("@")[0],
        role: "user",
      });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: "User creation failed", error: error.message });
  }
});

export default router;