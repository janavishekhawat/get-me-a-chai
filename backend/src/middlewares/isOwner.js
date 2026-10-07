import Post from "../models/Post.js";

const isOwner = async (req, res, next) => {
  const resourceId = req.params.postId || req.body.id;

  if (!resourceId) {
    return res.status(404).json({
      success: false,
      message: "not found",
    });
  }

  const resource = await Post.findById(resourceId);
  if (!resource) {
    return res.status(404).json({
      success: false,
      message: "not found",
    });
  }

  const userId = req.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "userId is not defined" });
  }

  if (String(resource.creator) != String(userId)) {
    return res.status(403).json({
      success: false,
      message: "not matched",
    });
  }
  next();
};

export default isOwner;
