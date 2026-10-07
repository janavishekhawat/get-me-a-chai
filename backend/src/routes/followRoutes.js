import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { startFollow, unFollow, getFollowStatus, followerList, followingList } from "../controllers/followController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/:creatorId/following", authMiddleware, startFollow);

router.delete("/:creatorId/unfollowing", authMiddleware, unFollow);

router.get("/:creatorId/follow-status", authMiddleware, getFollowStatus);

router.get("/:creatorId/follower-list", authMiddleware, followerList);

router.get("/:creatorId/following-list", authMiddleware, followingList)

export default router;