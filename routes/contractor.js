import { Router } from "express";
import * as controllers from "../controllers/contractors.js"


const router = Router();

// POST /homeowners - for creating a homeowner.
// POST /contractors - for creating a contractor.


// POST /jobs - for homeowners to create a job post.
router.post("/jobs", controllers.createJobPost);

// GET /jobs/:id - to fetch job details including bids and comments.
router.get("/jobs/:id", controllers.getJobPost);

// POST /jobs/:id/bid - for contractors to bid on a job.
// POST /jobs/:id/comment - to add comments on a job.

export default router;