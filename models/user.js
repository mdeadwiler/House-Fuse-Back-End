const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: "Choose a username",
  },
  hashedPassword: {
    type: String,
    required: true,
    default: "Choose a password",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: "Enter your email address",
  },
  firstName: {
    type: String,
    required: true,
    default: "Enter your first name",
  },
  lastName: {
    type: String,
    required: true,
    default: "Enter your last name",
  },
  isHomeOwner: {
    type: Boolean,
    default: false
  },
  // Contractor-only fields
  contractorCompany: {
    type: String,
    required: function () {
      return !this.isHomeOwner;
    },
    default: "Enter your company name",
  },
  contractorCategory: {
    type: String, 
    enum: ['roofing', 'electrical', 'plumbing', 'flooring', 'landscaper', 'general', 'other'],
    required: function () {
      return !this.isHomeOwner;
    },
  },
});

export default mongoose.model("User", userSchema);