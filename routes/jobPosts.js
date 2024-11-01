import { Router } from "express";
import * as jobPostControllers from "../controllers/jobPostController.js";
import * as commentControllers from "../controllers/commentController.js";
import * as bidControllers from "../controllers/bidController.js";
import verifyToken from "../middleware/verify-token.js";
import authorizedUser from "../middleware/authorized-user.js";

const router = Router();

// Job Post Routes
router.get("/", jobPostControllers.getJobPosts) // GET /api/jobPosts => Returns all Job Posts
router.get("/:jobPostId", verifyToken, jobPostControllers.getJobPost); // GET /api/jobPosts/:jobPostId => Returns a Job Post with associated comments and bids [params]
router.post("/", verifyToken, jobPostControllers.createJobPost); // POST /api/jobPosts - Creates a Job Post. [body]
router.delete("/:jobPostId", authorizedUser, jobPostControllers.deleteJobPost); // DELETE /api/jobPosts/:jobPostId => Deletes Job Post. [params]
router.put("/:jobPostId", authorizedUser, jobPostControllers.updateJobPost); // PUT /api/jobPosts/:jobPostId => Updates a Job Post. [params, body]

// Bid Routes
router.post("/:jobPostId/bids", verifyToken, bidControllers.createBid); // POST /api/jobPosts/:jobPostId/bids => Creates a Bid that belongs to a Job Post [params, body]

// Comment Routes
router.post("/:jobPostId/comments", verifyToken, commentControllers.addComment); // POST /api/jobPosts/:jobPostId/comments => Creates a comment that belongs to a Job Post [params, body]

export default router;