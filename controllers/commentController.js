import Comment from "../models/comment.js"

export const addComment = async (req, res) => {
  try {
    const { content } = req.body; // User enters content in form
    const { jobPostId } = req.params; // POST /jobPosts/:jobPostId/comment
    const { _id: userId } = req.user // User attached to request by VerifyToken middleware

    const comment = new Comment({
      content,
      userId,
      jobPostId
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: error.message });
  }
};