import Post from "../models/Post.js";
import User from "../models/user.js";

// Create a new post (creator only)
export const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const creator = await User.findById(userId);

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    // 2️⃣ Get image from multer
    const postimage = req.file?.path;

    const { title, content, category, tags } = req.body;

    if (!postimage || !title || !content ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const post = await Post.create({
      creator: creator._id,
      postimage,
      title,
      content,
      category,
      tags,
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { posts: post._id } },
      // { new: true }
    );

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log("the error is :- ", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get posts by creator
export const getCreatorPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const creator = await User.findOne({ username });
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const posts = await Post.find({ creator: creator._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (!post.creator.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
    // if (post.creator.toString() !== userId.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not authorized to delete this post",
    //   });
    // }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, try again later",
    });
  }
};

export const editing = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;
    const { title, content, tags } = req.body;

    const creator = await User.findById(userId);

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.creator.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();

    return res.status(200).json({
      success: true,
      messgae: "Post updated successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "post not found" });

    // const alreadyLiked = post.likes.includes(userId);
    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const likedUsers = await post.populate("likes", "username profileImage"); 

    res.status(200).json({
      success: true,
      likedUsers: likedUsers,
      likes: post.likes.length,
    });
  } catch (err) {
    console.log("the error in toggel Like is : ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }

    const populatesLikes = await post.populate(
      "likes",
      "username profileImage",
    );

    return res.status(200).json({
      success: true,
      likedUsers: populatesLikes,
      message: "all likes array",
    }); 
  } catch (error) {
    console.log("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};