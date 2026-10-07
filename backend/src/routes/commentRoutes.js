import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addComment, GetComments, DeleteComment, ReplyComments, GetReplies, DeleteReply } from "../controllers/commentController.js";

const router = express.Router();

router.post("/post/:postId/comment", authMiddleware, addComment);

router.get("/get/:postId/getComments", authMiddleware, GetComments);

router.delete("/delete/:postId/:commentId", authMiddleware, DeleteComment);

router.post("/post/:postId/:commentId", authMiddleware, ReplyComments);

router.get("/get/:postId/:commentId/getReplies", authMiddleware, GetReplies);

router.delete("/delete-reply/:postId/:commentId/:replyId", authMiddleware, DeleteReply);

export default router;