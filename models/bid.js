const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
        required: true
    },
    bidAmount: {
        type: Number,
        required: true,
    },
    bidDate: {
        type: Date,
        default: Date.now,
    },
    jobStartDate: {
        startDate: Date,
        required: true,
    },
    jobEndDate: {
        endDate: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

export default mongoose.model("Bid", bidSchemaSchema);