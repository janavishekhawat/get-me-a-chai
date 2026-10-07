import Follow from "../models/Follow.js";
import Post from "../models/Post.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    const res1 = await Post.updateMany(
      {},
      {
        $pull: {
          likes: userId,
          comments: { user: userId },
        },
      },
    );

    const res2 = await Post.updateMany(
      { "comments.replies.user": userId }, // Filter: Jahan reply mein user ID ho
      {
        $pull: {
          "comments.$[].replies": { user: userId },
        },
      },
    );

    const res3 = await Post.deleteMany({ creator: userId });

    const res4 = await Follow.deleteMany({
      $or: [{ user: userId }, { following: userId }],
    });

    const res5 = await Profile.deleteOne({ user: userId });

    const res6 = await User.deleteOne({ _id: userId });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// this response tell us that how much data we are deleting it will show the count
// res.status(200).json({
//   message: "Account and all data deleted successfully",
//   details: {
//     interactions: res1.modifiedCount + res2.modifiedCount,
//     postsRemoved: res3.deletedCount,
//     connectionsRemoved: res4.deletedCount,
//     profileDeleted: res5.deletedCount === 1, // True/False dikhayega
//     userDeleted: res6.deletedCount === 1     // True/False dikhayega
//   }
// });
