import JobPost from "../model/jobPost.js";

 export const createJobPost = async (req, res) => {
    try {
        const createJobPost = await JobPost.create(req.body);
        res.status(201).json(createJobPost);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};




//router.get("/jobs/:id", controllers.getJob);