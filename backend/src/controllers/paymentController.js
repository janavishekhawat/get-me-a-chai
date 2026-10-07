import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import User from "../models/user.js";
import Payment from "../models/payment.js";
import { instance } from "../config/Razorpay.js";


// Create Razorpay order
export const capturePayment = async (req, res) => {
  try {
    // amount in rupees, creatorId = creator's "username" field
    const { amount, creatorId } = req.body;

    if (!amount || !creatorId) {
      return res.status(400).json({
        success: false,
        message: "Amount and id required",
      });
    }

    // find creator by username
    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        creatorId: creator._id.toString(),
        creatorId: creator.username,
      },
    }; 

    const paymentResponse = await instance.orders.create(options);

    return res.status(201).json({
      success: true,
      data: paymentResponse,
    });
  } catch (err) {
    console.error("Error while payment :", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Verify signature and save payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      creatorId,
      amount,
      message,
    } = req.body; 
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !creatorId
    ) {
      return res.status(404).json({ success: false, message: "Missing payment details" });
    }

    // verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // signature valid -> save payment
    const supporterId = req.user; // set by authMiddleware
    const supporter = await User.findById(supporterId);
    if (!supporter)
      return res
        .status(404)
        .json({ success: false, message: "Supporter not found" });

    const creator = await User.findById(creatorId);
    if (!creator)
      return res
        .status(404)
        .json({ success: false, message: "Creator not found" });

    const amt = amount ? Number(amount) : 0;

    const paymentData = await Payment.create({
      sender: supporterId,
      receiver: creatorId,
      supporterName: supporter.username,
      creatorName: creator.username,
      amount: amt,
      message: message,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified and saved",
      data: paymentData,
    });
  } catch (err) {
    console.error("Error while verifying payment :", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSuppoterData = async (req, res) => {
  try{
    const { username } = req.body

    if(!username){
      return res.status(404).json({
        success: false,
        message: "username required",
      })
    }
    const creator = await User.findOne({ username });
    if (!creator) {
      return res.status(404).json({ success: false, message: "Creator not found" });
    }

    const supporterData = await Payment.find({ receiver: creator._id })

    return res.status(200).json({
      success: true,
      data: supporterData,
    })
  }catch(error){
    console.log("Error in fetching suppoters data : ", err)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getPaymentHistory = async (req, res) => {
  try{
    const userId = req.user

    if(!userId){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const paymentData = await Payment.find({ sender: userId })

    return res.status(200).json({
      success: true,
      data: paymentData,
    })
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}