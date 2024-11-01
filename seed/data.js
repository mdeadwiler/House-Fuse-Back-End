import db from "../db/connection.js";
import User from "../models/User.js";
import JobPost from "../models/JobPost.js";
import Comment from "../models/Comment.js";
import Bid from "../models/Bid.js";
import bcrypt from "bcrypt";

const insertData = async () => {
  // Reset database
  await db.dropDatabase();

  // Create home owner users
  const homeOwner1 = new User({
    username: "john_doe",
    email: "john@example.com",
    hashedPassword: await bcrypt.hash("password123", 11),
    firstName: "John",
    lastName: "Doe",
    isHomeOwner: true
  });

  const homeOwner2 = new User({
    username: "jane_smith",
    email: "jane@example.com",
    hashedPassword: await bcrypt.hash("securePass123", 11),
    firstName: "Jane",
    lastName: "Smith",
    isHomeOwner: true
  });

  await homeOwner1.save();
  await homeOwner2.save();

  // Create contractor users
  const contractor1 = new User({
    username: "roof_master",
    email: "roofmaster@example.com",
    hashedPassword: await bcrypt.hash("roofPass456", 11),
    firstName: "Mike",
    lastName: "Roofer",
    isHomeOwner: false,
    contractorCompany: "Top Roofs Inc.",
    contractorCategory: "roofing"
  });

  const contractor2 = new User({
    username: "plumber_pro",
    email: "plumberpro@example.com",
    hashedPassword: await bcrypt.hash("plumbSecure789", 11),
    firstName: "Alice",
    lastName: "Plumber",
    isHomeOwner: false,
    contractorCompany: "Pro Plumbing Co.",
    contractorCategory: "plumbing"
  });

  const contractor3 = new User({
    username: "electric_expert",
    email: "electric@example.com",
    hashedPassword: await bcrypt.hash("electric123", 11),
    firstName: "Eli",
    lastName: "Electrician",
    isHomeOwner: false,
    contractorCompany: "Bright Sparks LLC",
    contractorCategory: "electrical"
  });

  await contractor1.save();
  await contractor2.save();
  await contractor3.save();

  // Create job posts by home owners
  const jobPost1 = new JobPost({
    title: "Fix my roof",
    postedBy: homeOwner1._id,
    content: "Need an urgent roof repair before winter.",
    category: "roofing",
    location: "123 Main St",
  });

  const jobPost2 = new JobPost({
    title: "Plumbing work needed",
    postedBy: homeOwner2._id,
    content: "Kitchen sink leaking and needs fixing.",
    category: "plumbing",
    location: "456 Oak St",
  });

  await jobPost1.save();
  await jobPost2.save();

  // Add bids by contractors to each job post
  const bid1 = new Bid({
    jobPost: jobPost1._id,
    contractor: contractor1._id,
    bidAmount: 1200,
    jobStartDate: new Date(),
    jobEndDate: new Date(),
  });

  const bid2 = new Bid({
    jobPost: jobPost1._id,
    contractor: contractor2._id,
    bidAmount: 900,
    jobStartDate: new Date(),
    jobEndDate: new Date(),
  });

  const bid3 = new Bid({
    jobPost: jobPost2._id,
    contractor: contractor3._id,
    bidAmount: 500,
    jobStartDate: new Date(),
    jobEndDate: new Date(),
  });

  await bid1.save();
  await bid2.save();
  await bid3.save();

  // Add comments by contractors and home owners on the job posts
  const comment1 = new Comment({
    content: "We can start the job next week if you're ready.",
    userId: contractor1._id,
    jobPost: jobPost1._id,
  });

  const comment2 = new Comment({
    content: "Is the project still open? I'm available for this.",
    userId: contractor2._id,
    jobPost: jobPost1._id,
  });

  const comment3 = new Comment({
    content: "Let's discuss timing and budget.",
    userId: homeOwner1._id,
    jobPost: jobPost1._id,
  });

  const comment4 = new Comment({
    content: "I'll bring all necessary materials.",
    userId: contractor3._id,
    jobPost: jobPost2._id,
  });

  const comment5 = new Comment({
    content: "Thank you for the bid! We'll decide soon.",
    userId: homeOwner2._id,
    jobPost: jobPost2._id,
  });

  await comment1.save();
  await comment2.save();
  await comment3.save();
  await comment4.save();
  await comment5.save();

  console.log("Database seeded successfully with users, job posts, bids, and comments!");

  // Close database connection
  db.close();
};

insertData();