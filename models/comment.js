import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        default: "Enter your comment here"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //testing purposes, will be removed later
        required: false
    },
    //dyanmic references, so we can attach coments to either job posts or bids and keep organized data relationships
    parentType: {
        type: String,
        enum: ['JobPost', 'Bid'],
        //testing purposes, will be removed later
        required: false
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        //testing purposes, will be removed later
        required: false,
        refPath: 'parentType'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Comment", commentSchema);