import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { deleteAccount } from "../controllers/deleteAccountController.js";

const router = express.Router();

router.delete("/deleteMyaccount", authMiddleware, deleteAccount);

export default router;