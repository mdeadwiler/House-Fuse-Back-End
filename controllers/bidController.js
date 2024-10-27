import Bid from '../models/bid.js';
import JobPost from '../models/jobPost.js';
import Comment from '../models/comment.js';

//handling all logic for creating, reading, updating, deleting bids (CRUD)

//creating bid with reference to jobs and contractors
export const createBid = async (req, res) => {
    try {
        const { jobPostId } = req.params;
        const { contractorId, bidAmount, jobStartDate, jobEndDate } = req.body;

        const jobPost = await JobPost.findById(jobPostId);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }

        const bid = new Bid({
            jobPost: jobPostId,
            contractor: contractorId,
            amount: bidAmount,
            startDate: jobStartDate,
            endDate: jobEndDate,
        });

        await bid.save();
        await jobPost.bids.push(bid._id);
        await jobPost.save();

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//creating a bid comment
export const addBidComment = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { content, userId } = req.body;

        const comment = new Comment({
            content,
            userId,
            parentType: 'Bid',
            parentId: bidId,
        });
        await comment.save();

        const bid = await Bid.findById(bidId);
        await bid.comments.push(comment._id);
        await bid.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
