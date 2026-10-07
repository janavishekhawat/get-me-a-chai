import mongoose from "mongoose";

const profileschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },
    goalAmount: {
      type: Number,
      default: 0,
    },
    totalReceived: {
      type: Number,
      default: 0,
    },
    totalEarning: {
      type: Number,
      default: 0,
    },
    chaiPrice: {
      type: Number,
      default: 50,
    },
    bio: {
      type: String,
      default: "",
    },
    upi: {
      type: String,
      default: "",
    },

    coverImage: { type: String, default: "" },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileschema);
export default Profile;
