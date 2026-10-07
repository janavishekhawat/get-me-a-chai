import User from "../models/user.js";
import Follow from "../models/Follow.js";

export const startFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const { creatorId } = req.params;

    if (userId.toString() === creatorId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });

      // ise is tarah bhi likha jaa sakta hai
      // if (userId.equals(creatorId)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "You cannot follow yourself",
      //   });
    }

    const creator = await User.findById(creatorId);

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const alreadyFollowing = await Follow.findOne({
      user: userId,
      following: creatorId,
    });

    if (alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "Already following",
      });
    }

    await Follow.create({
      user: userId,
      following: creatorId,
    });

    return res.status(200).json({
      success: true,
      message: "🎉 You are now following this creator!",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const unFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const { creatorId } = req.params;

    const creator = await User.findById(creatorId);

    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const followdoc = await Follow.findOne({
      user: userId,
      following: creatorId,
    });

    if (!followdoc) {
      return res.status(400).json({
        success: false,
        message: "You are not following this creator",
      });
    }

    await followdoc.deleteOne();

    return res.status(200).json({
      success: true,
      message: "👋 You have unfollowed this creator.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getFollowStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { creatorId } = req.params;

    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",

        
      });
    }

    const followersCount = await Follow.countDocuments({
      following: creatorId,
    });
    const followingCount = await Follow.countDocuments({ user: creatorId });

    const followDoc = await Follow.findOne({
      user: userId,
      following: creatorId, 
    });

    return res.status(200).json({
      success: true,
      isFollowing: !!followDoc,
      followersCount,
      followingCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const followerList = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const followerDocs = await Follow.find({ following: creatorId }).populate({
      path: "user",
      select: "username profileImage",
    });

    const followers = followerDocs.map((doc) => doc.user);

    return res.status(200).json({
      success: true,
      followers,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const followingList = async(req, res) => {
  try{

    const { creatorId } = req.params;

    const followingDocs = await Follow.find({ user: creatorId }).populate({
      path: "following",
      select: "username profileImage",
    })

    const followings = followingDocs.map((doc) => doc.following);
    
    return res.status(200).json({
      success: true,
      followings,
    })
  }catch{
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
