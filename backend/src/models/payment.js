import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  sender: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  receiver: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  supporterName: {
    type: String,
    required: true,
  },

  creatorName: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  Usermessage: {
    type: String,
    default: "",
  },

  paymentId: {
   type: String,
   required: true,
},

orderId: {
   type: String,
   required: true,
},

  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
