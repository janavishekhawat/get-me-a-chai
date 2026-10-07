import Post from "../models/Post.js";
import Follow from "../models/Follow.js";

export const GetAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 9 } }]);

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Posts Found" });
    }

    return res.status(200).json({
      success: true,
      posts,
      message: "Explore the All creativity",
    });
  } catch (error) {
    console.error("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const GetOnlyPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "creator",
      "username profileImage",
    );

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
      message: "Post Found Successfully",
    });
  } catch (error) {
    console.error("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const GetFollowingPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const followingData = await Follow.find({ user: userId }).select("following");
    const followingIds = followingData.map((f) => f.following);

    // Fetch the recent 50 posts from followed users
    const posts = await Post.find({ creator: { $in: followingIds } })
      .limit(50) 
      .populate("creator", "username profileImage");

    // Shuffle the array randomly in JS
    const shuffledPosts = posts.sort(() => Math.random() - 0.5);

    return res.status(200).json({
      success: true,
      posts: shuffledPosts,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching feed" });
  }
};
