import mongoose from "mongoose";
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
    default: "Choose a password",
  },
  email: {
    type: String,
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

// This will allow a hashedPassword through bcrypt for the user authentication
// We had to use this method because we are using "This." and arrow functions do not work with "This." because it has no source to pull documents(data)
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('hashedPassword')) 
//     return next();
//  try {
//     const saltRounds = 10;
//     this.hashedPassword = bcrypt.hash(this.hashedPassword, saltRounds);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });



export default mongoose.model("User", userSchema);