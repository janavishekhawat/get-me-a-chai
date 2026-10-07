import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPost, getCreatorPosts, toggleLike, deletePost, editing, GetLikes, } from "../controllers/postController.js";
import upload from "../middlewares/uploadMiddleware.js";
import isOwner from "../middlewares/isOwner.js";

const router = express.Router();

// Create post (creator only)
router.post("/create-post", authMiddleware, upload.single("postimage"), createPost);

// Get posts by creator
router.get("/postDetails/:username", getCreatorPosts);

// ✅ Like / Unlike post
router.post("/post/:postId/like", authMiddleware, toggleLike);

router.delete("/post/:postId/deleting", authMiddleware, isOwner, deletePost);

router.put("/:postId/editing", authMiddleware, isOwner, editing);

router.get("/get/:postId/getLikes", authMiddleware, GetLikes);

export default router;