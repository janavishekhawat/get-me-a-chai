import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

// If your middleware exports named: use
// import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  getUserProfile,
  updateUserProfile,
  getMe,
} from "../controllers/userController.js";
import isAccountOwner from "../middlewares/isAccountOwner.js";

const router = express.Router();

// Get logged-in user profile (basic)
router.get("/profile", authMiddleware, getUserProfile);

// Update logged-in user profile
router.put("/update-profile", authMiddleware, upload.single('profileImage'), updateUserProfile);

// Rich "me" endpoint (profile + payments + totals)
router.get("/me", authMiddleware, getMe);

router.get("/creators", async (req, res) => {
  const creators = await User.find().select(
    "name username bio profileImage goalAmount"
  );
  res.json({ creators });
});

export default router;