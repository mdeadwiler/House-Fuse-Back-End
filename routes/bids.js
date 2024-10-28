import { Router } from 'express';
import * as bidControllers from '../controllers/bidController.js';
import * as commentControllers from '../controllers/commentController.js';

const router = Router();

//POST route to create bid on job post
router.post('/jobPosts/:jobPostId/bids', bidControllers.createBid);

//POST route to create a comment on a bid
router.post('/bids/:bidId/comments', commentControllers.addComment);

//PUT request to update cmments
router.put('/bids/:bidId/comments/:commentId', commentControllers.updateComment);

//DELETE request to delte bid comments
router.delete('/bids/:bidId/comments/:commentId', commentControllers.deleteComment);


export default router;
