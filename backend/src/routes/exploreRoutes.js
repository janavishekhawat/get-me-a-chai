import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { GetAllPosts, GetOnlyPost, GetFollowingPosts } from "../controllers/exploreController.js";

const router = express.Router();

router.get("/get-all-posts", GetAllPosts);

router.get("/getfocusedpost/:postId", GetOnlyPost);

router.get("/getFollowingList", authMiddleware, GetFollowingPosts);

export default router;