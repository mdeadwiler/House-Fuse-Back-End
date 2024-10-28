import { Router } from "express";
import * as jobPostControllers from "../controllers/jobPostController.js";
import * as commentControllers from "../controllers/commentController.js";

const router = Router();


// POST /jobs - for homeowners to create a job post.
router.post("/jobPosts", jobPostControllers.createJobPost);

// GET /jobs/:id - to fetch job details including bids and comments.
router.get("/jobPosts/:jobPostId", jobPostControllers.getJobPost);

// POST to add comments on job posts
router.post("/jobPosts/:jobPostId/comments", commentControllers.addComment);

// PUT update comments
router.put("/jobPosts/:jobPostId/:commentId", commentControllers.updateComment);

//DEL comments
router.delete("/jobPosts/:jobPostId/:commentId", commentControllers.deleteComment)

export default router;