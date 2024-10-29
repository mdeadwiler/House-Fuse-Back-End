
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
    jobPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'JobPost'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Comment", commentSchema);