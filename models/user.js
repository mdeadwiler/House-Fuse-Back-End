import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isHomeOwner: {
    type: Boolean,
    default: true,
    required: true,
  },
  // Contractor-only fields
  contractorCompany: {
    type: String,
    required: function () {
      return !this.isHomeOwner;
    },
  },
  contractorCategory: {
    type: String,
    enum: [
      "roofing",
      "electrical",
      "plumbing",
      "flooring",
      "landscaper",
      "general",
      "other",
    ],
    required: function () {
      return !this.isHomeOwner;
    },
  },
});

export default mongoose.model("User", userSchema);
