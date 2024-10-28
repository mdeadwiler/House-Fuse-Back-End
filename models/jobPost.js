import mongoose from 'mongoose';

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
        //testing purposes, remove later
        required: false,
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
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        //testing purposes, will be removed later
        required: false,
    }],
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
        //testing purposes, will be removed later
        required: false,
      }]
    });

    export default mongoose.model("JobPost", jobPostSchema);
    

