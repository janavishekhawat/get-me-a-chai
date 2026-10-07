import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { CreateOrder, VerifyPayment, GetSupporterData, ResetTotalAmount } from "../controllers/razorpayController.js"

const router = express.Router();

router.post("/create-order", authMiddleware, CreateOrder);

router.post("/verify-payment", authMiddleware, VerifyPayment);

router.get("/supporterData/:creatorId", GetSupporterData);

router.put("/resetamount", authMiddleware, ResetTotalAmount)

export default router;