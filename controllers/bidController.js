import Bid from '../models/bid.js';
import JobPost from '../models/jobPost.js';
// import Comment from '../models/comment.js';

//handling all logic for creating, reading, updating, deleting bids (CRUD)

//creating bid with reference to jobs and contractors

export const createBid = async (req, res) => {
    try {
        //get job post ID from route parameter
        const { jobPostId } = req.params;
        //bid details from request body to us later so it's easier
        const { contractor, bidAmount, jobStartDate, jobEndDate } = req.body;

        const jobPost = await JobPost.findById(jobPostId);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }

        const bid = new Bid({
            jobPost: jobPostId,
            contractor,
            bidAmount,
            jobStartDate,
            jobEndDate,
        });

        await bid.save();

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// [TBU] DELETE and PUT bids

