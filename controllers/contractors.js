import JobPost from "../models/jobPost.js";

export const createJobPost = async (req, res) => {
  try {
    const newJobPost = await JobPost.create(req.body);
    res.status(201).json(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// export const createJobPost = async (req, res) => {
//     try {
//       console.log("Request Body:", req.body); // Check incoming data
//       const newJobPost = await JobPost.create(req.body);
//       res.status(201).json(newJobPost);
//     } catch (error) {
//       console.error("Error creating job post:", error.message); // Log any errors
//       res.status(500).json({ error: error.message });
//     }
//   };




export const getJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.jobPostId);
    if (jobPost) {
      const newComment = new Comment({
        content: req.body.content,
        author: req.sessions.user._id,
        jobPost: req.params.jobPostId,
      });
      await newComment.save();
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

