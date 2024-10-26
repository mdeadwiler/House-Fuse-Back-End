const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Give your job post a title",
    },
    /* reference to user who created the post allows a relationship between 
     the jobPost and User collections in database (like a foreign key in SQL)*/
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateCreated: {
        type: Date, 
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
        default: "Enter the details of your job post here",
        minlength: 10,
        maxlength: 5000,
    },
        category: {
            type: String, 
            enum: ['roofing', 'electrical', 'plumbing', 'flooring', 'landscaper', 'carpentry', 'general', 'other'],
            required: true,
    },
        location: {
            type: String,
            required: false,
            default: "Enter the address of your job",
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed'],
        default: 'open'
    }
    });

    const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true,
            default: "Enter your comment here",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        jobPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPost',
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
    });
    
    const JobPost = mongoose.model('JobPost', jobPostSchema);
    const Comment = mongoose.model('Comment', commentSchema);
    
    module.exports = { JobPost, Comment };

// to get the job post with complete user informatoin:

// const jobPost = await JobPost.findById(postId).populate('postedBy')
// see postedBy line 11
// 

//to get comments with full user details:

// const comments = await Comment.find({ jobPost: jobPostId })
//     .populate('author')
//     .sort({ dateCreated: -1 });

