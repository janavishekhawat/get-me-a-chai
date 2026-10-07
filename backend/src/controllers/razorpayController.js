import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.js";
import User from "../models/user.js";
import Profile from "../models/profile.js";

export const CreateOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount < 50) {
    return res.status(400).json({
      success: false,
      message: "minimum amount is ₹50",
    });
  }
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

export const VerifyPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      Usermessage,
      CreatorID,
    } = req.body;

    const creator = await User.findById(CreatorID);

    if (!creator) {
      return res.status(400).json({
        success: false,
        message: "Creator not found",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    const existingPayment = await Payment.findOne({
      paymentId: razorpay_payment_id,
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists",
      });
    }

    if (isAuthentic) {
      const newPayment = await Payment.create({
        sender: userId,

        receiver: CreatorID,

        supporterName: user.username,

        creatorName: creator.username,

        amount: Number(amount),

        Usermessage,

        paymentId: razorpay_payment_id,

        orderId: razorpay_order_id,
      });

      await Profile.findOneAndUpdate(
        { user: CreatorID },
        {
          $inc: {
            totalReceived: Number(amount),
            totalEarning: Number(amount),
          },
        },
        { new: true },
      );
      // await User.findByIdAndUpdate(userId, { $push: { payment: newPayment._id } });
      await User.findByIdAndUpdate(CreatorID, {
        $push: { payment: newPayment._id },
      });

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

export const GetSupporterData = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creator = await User.findById(creatorId).populate({
      path: "payment",
      select: "supporterName amount Usermessage",
      populate: {
        path: "sender",
        select: "profileImage",
      },
    });

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "creator not found",
      });
    }
    const supporterData = creator.payment;

    return res.status(200).json({
      success: true,
      message: "all Supporters",
      supporterData,
    });
  } catch (err) {
    console.log("the error is : ", err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const ResetTotalAmount = async (req, res) => {
  try {
    const userId = req.userId;
    // const profile = await Profile.findOne({ user: userId });
    // if (!profile) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Profile not found",
    //   });
    // }
    // or we can do this also
      await Profile.updateOne(
      { user: userId },
      { $set: { totalReceived: 0 } }
    );
    
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Total Amount Reset Successfully",
    });
  } catch (err) {
    console.log("the error is : ", err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
