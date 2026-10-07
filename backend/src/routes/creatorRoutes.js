import express from "express";
import { getAllCreators, getUserProfile, GetsearchWord } from "../controllers/creatorController.js";

const router = express.Router();

// Update profile
router.get("/all", getAllCreators);

// Get user profile by username
router.get("/userDetails/:username", getUserProfile);

router.get("/searchWord/:word", GetsearchWord);

export default router;