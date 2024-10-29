import JobPost from "../models/jobPost.js";
import Bid from "../models/bid.js";
import Comment from "../models/comment.js";

export const getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({})
    res.json(jobPosts)
  } catch (error) {
    console.error("Error fetching job posts:", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const getJobPost = async (req, res) => {
  try {
    // Find job post by ID
    const jobPost = await JobPost.findById(req.params.jobPostId)
    const bids = await Bid.find({jobPost: jobPost._id}) // Find all bid by jobPost ID
    const comments = await Comment.find({jobPost: jobPost._id  })

    // Check if job post exists
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Send the job post details as JSON
    res.status(200).json({jobPost, bids, comments});
  } catch (error) {
    console.error("Error fetching job post:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createJobPost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    req.body.postedBy = userId;
    const newJobPost = await JobPost.create(req.body);
    res.status(201).json(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteJobPost = async (req, res) => {
  try {
    const deletedJobPost = await JobPost.findByIdAndDelete(req.params.jobPostId)
    res.status(201).json(deletedJobPost);
  } catch (error) {
    console.error("Error deleting job post:", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const updateJobPost = async (req, res) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(req.params.jobPostId, req.body)
    res.json(updatedJobPost)
  } catch (error) {
    console.error("Error updating job post:", error.message);
    res.status(500).json({ error: error.message });
  }
}