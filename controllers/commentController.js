import Comment from "../models/comment.js"

export const addComment = async (req, res) => {
  try {
    const { content } = req.body; // User enters content in form
    const { jobPostId } = req.params; // POST /jobPosts/:jobPostId/comment
    const { _id: userId } = req.user // User attached to request by VerifyToken middleware

    const comment = new Comment({
      content,
      userId,
      jobPost: jobPostId
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comment.findByIdAndDelete(req.params.commentId)
    res.status(201).json(deleteComment);
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const updateComment = async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body)
    res.json(updateComment)
  } catch (error) {
    console.error("Error updating comment:", error.message);
    res.status(500).json({ error: error.message });
  }
}