import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,

import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: false,
    default: "Choose a username",
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
    required: false,
    unique: false,
    default: "Enter your email address",
  },
  firstName: {
    type: String,
    required: false,
    default: "Enter your first name",
  },
  lastName: {
    type: String,
    required: false,
    default: "Enter your last name",
  },
  isHomeOwner: {
    type: Boolean,
    default: true
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