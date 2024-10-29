import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();



// This is updated from dev branch AFTER FIXING FROM COMMONJS TO (ECMASCRIPT 6)ES6 SYNTAX 

// Signup route
export const signup = ("/signup", async (req, res) => {
  try {
    const { username, password , email, firstName, lastName, isHomeOwner, contractorCompany, contractorCategory } = req.body;

    // Check if email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    // Check if username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username is already taken." });
    }


   const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
   // Create a new user with isHomeowner field
    const newUser = await User.create({
      username,

      hashedPassword,
      
      hasedPassword: password,

      email,
      firstName,
      lastName,
      isHomeOwner,
      contractorCompany: isHomeOwner ? "" : contractorCompany,
      contractorCategory: isHomeOwner ? "" : contractorCategory,
      contractorCompany,
      contractorCategory,

    });

    // Generate JWT for the new user (without expiration)
    const token = jwt.sign(
      {
        username: newUser.username,
        _id: newUser._id,
        isHomeOwner: newUser.isHomeOwner,
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signin route
export const signin = ("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username not found." });
    }

    // Check if the password matches
    const isMatch = bcrypt.compareSync(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    // Generate JWT for the user (without expiration)
    const token = jwt.sign(
      { username: user.username, _id: user._id, isHomeOwner: user.isHomeOwner },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


