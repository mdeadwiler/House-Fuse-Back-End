import jwt from "jsonwebtoken";
import JobPost from "../models/jobPost.js";

async function authorizedUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const jobPost = await JobPost.findById(req.params.jobPostId)

    if (jobPost.postedBy.toString() !== user._id) {
      return res.status(404).json({ error: "Not Authorized." });
    }
 
    // Call next() to invoke the next middleware function
    next();
  } catch (error) {
    // If errors, send back a 401 'Invalid token.' error
    res.status(401).json({ error: "Not Authorized." });
  }
}

export default authorizedUser;
