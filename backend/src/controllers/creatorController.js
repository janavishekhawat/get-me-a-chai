import User from "../models/user.js";
import Profile from "../models/profile.js";

// Get user public profile
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password").populate("profile");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCreators = async (req, res) => {
  try {
    const creators = await User.find().select("-password -email"); // all users
    res.status(200).json({ success: true, creators });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const GetsearchWord = async(req, res) => {
  try {
    const { word } = req.params;

    const selectedName = await User.find({username : { $regex: "^" + word, $options: 'i' }}).select("username profileImage");

    return res.status(200).json({
      success: true,
      selectedName,
      message: "this are some similar names",
    })

  } catch (err) {
    console.log("we got some issue in GetsearchWord : ", err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
}