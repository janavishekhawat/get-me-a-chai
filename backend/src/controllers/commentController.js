import Post from "../models/Post.js";
import User from "../models/user.js";

export const addComment = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    post.comments.push({ user: userId, text });
    const savedPost = await post.save();

    // POPULATE the last comment specifically
    const populatedPost = await savedPost.populate({
      path: "comments.user",
      select: "username profileImage",
    });

    const newComment =
      populatedPost.comments[populatedPost.comments.length - 1];

    return res.status(201).json({
      success: true,
      comment: newComment,
      message: "✅ comment submitted successfully",
    });
  } catch (err) {
    console.log("the error in addComment function is :- ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }

    const populatedPost = await post.populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

    return res.status(200).json({
      success: true,
      comments: populatedPost.comments,
      message: "All Comments",
    });
  } catch (error) {
    console.log("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const DeleteComment = async (req, res) => {
  const userId = req.userId;
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }

    const comment = await post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment id not found",
      });
    }

    if (
      comment.user.toString() === userId.toString() ||
      post.creator.toString() === userId.toString()
    ) {
      await comment.deleteOne();
      // await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment Deleted successfully",
      });
    }
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  } catch (error) {
    console.log("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const ReplyComments = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, commentId } = req.params;
    const { text } = req.body;

    // 1. Atomically push the new reply into the specific comment inside the post
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId }, // Find the post and the exact comment
      { 
        $push: { "comments.$.replies": { user: userId, text } } // '$' references the matched comment
      },
      { new: true } // Crucial: returns the modified document instead of the old one
    );

    // If updatedPost is null, either the post or the specific comment didn't exist
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post or Comment not found" });
    }

    // 2. Populate the user details inside the nested replies
    await updatedPost.populate({
      path: "comments.replies.user",
      select: "username profileImage",
    });

    // 3. Extract the specific comment and its latest reply
    const targetComment = updatedPost.comments.id(commentId);
    const newReply = targetComment.replies[targetComment.replies.length - 1];

    return res.status(201).json({
      success: true,
      rcomment: newReply,
      message: "✅ reply submitted successfully",
    });
  } catch (error) {
    console.log("the error in submitting the reply is : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const GetReplies = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    await post.populate({
      path: "comments.replies.user",
      select: "username profileImage",
    });

    const targetComment = await post.comments.id(commentId);
    if (!targetComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      AllReplys: targetComment.replies,
      message: "all replies",
    });
  } catch (error) {
    console.log("the errors is : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const DeleteReply = async (req, res) => {
  const userId = req.userId;
  const { postId, commentId, replyId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }

    const comment = await post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment id not found",
      });
    }

    const reply = await comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "comment id not found",
      });
    }

    if (
      reply.user.toString() == userId.toString() ||
      post.creator.toString() === userId.toString()
    ) {
      // const result = await post.updateOne(
      //   { _id: postId },
      //   {
      //     $pull: {
      //       "comments.$[commentElement].replies": { _id: replyId },
      //     },
      //   },
      //   {
      //     arrayFilters: [{ "commentElement._id": commentId }],
      //   },
      // );

      // Check if the database actually found and modified the document
      // if (result.modifiedCount === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Post, comment, or reply not found, or nothing was deleted.",
      //   });
      // }

      await reply.deleteOne();

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Reply deleted successfully",
      });
    }
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  } catch (error) {
    console.log("the error is : ", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
