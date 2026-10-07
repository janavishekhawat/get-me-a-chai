import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profileImage : {
    type: String,
    default: "",
  },

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: null, // user may not have profile yet
    },

    payment: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        default: null,
      },],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
