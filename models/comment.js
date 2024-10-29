
import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //dyanmic references, so we can attach coments to either job posts or bids and keep organized data relationships
    parentType: {
        type: String,
        enum: ['JobPost', 'Bid'],
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'parentType'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Comment", commentSchema);