import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true
  },
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //testing change back to true later
    required: false
  },
  bidAmount: {
    type: Number,
    //testing change back to true later
    required: false
  },
  bidDate: {
    type: Date,
    default: Date.now,
  },
  jobStartDate: {
    type: Date,
    //testing change back to true later           
    required: false,       
  },
  jobEndDate: {
    type: Date,       
    //testing change back to true later
    required: false, 
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Bid", bidSchema);
