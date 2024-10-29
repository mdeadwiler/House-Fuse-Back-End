import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true
  },
  bidDate: {
    type: Date,
    default: Date.now,
  },
  jobStartDate: {
    type: Date,           
    required: true,       
  },
  jobEndDate: {
    type: Date,       
    required: true, 
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Bid", bidSchema);
