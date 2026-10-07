import Profile from "../models/profile.js";
import User from "../models/user.js";

// 1️⃣ Get logged-in user profile (basic)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("profile"); // req.user = userId
    if (!user)
      return res
        .status(404)
        .json({ message: " in get user profile : User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { bio, goalAmount, upi } = req.body;

    const profileImage = req.file?.path;
    const userId = req.userId;

    const user = await User.findById(userId);
    let profile = await Profile.findOne({ user: userId });

    const imagePath = req.file?.path;

    if (!profile) 
    {
      profile = await Profile.create({
        user: userId,
        bio, 
        goalAmount,
        upi,
      })
      await User.findByIdAndUpdate(userId, { profile: profile._id });
    }
    else
    {
      if (bio !== undefined) profile.bio = bio;
      if (goalAmount !== undefined) profile.goalAmount = goalAmount;
      if (upi !== undefined) profile.upi = upi;

      await profile.save();
    }
    if(profileImage !== undefined)
    {
      await User.findByIdAndUpdate(userId, { profileImage: imagePath });
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      username: user.username,
      user: user,
      data : profile,
    });
  } catch (err) {
    console.log("the error is :- ", err);
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Get "me" — richer profile with payments + totals
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("payments")
      .populate("profile");

    if (!user) {
      return res.status(404).json({ message: "In get me : User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

