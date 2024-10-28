import bcrypt from "bcrypt";
import User from "./models/user.js";
import jwt from "jsonwebtoken";

const SALT_LENGTH = 12;
// This is updated from dev branch AFTER FIXING FROM COMMONJS TO (ECMASCRIPT 6)ES6 SYNTAX 

// Signup route
export const signup = ("/signup", async (req, res) => {
  try {
    const { email, username, password, isHomeowner } = req.body;

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

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);

    // Create a new user with isHomeowner field
    const newUser = await User.create({
      email,
      username,
      hashedPassword,
      isHomeowner,
    });

    // Generate JWT for the new user (without expiration)
    const token = jwt.sign(
      {
        username: newUser.username,
        _id: newUser._id,
        isHomeowner: newUser.isHomeowner,
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user: newUser, token });
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
      { username: user.username, _id: user._id, isHomeowner: user.isHomeowner },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


