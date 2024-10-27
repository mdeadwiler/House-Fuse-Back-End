import { Router } from 'express';
import * as controllers from '../controllers/bidController.js';

const router = Router();

//POST route to create bid on job post
router.post('/jobPosts/:jobPostId/bids', controllers.createBid);

//POST route to add comment to bid
router.post('/bids/:bidId/comments', controllers.addBidComment);

export default router;
