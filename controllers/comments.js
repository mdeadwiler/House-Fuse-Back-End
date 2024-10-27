import comment from "../models/comment.js"

export const createComment = async (request, response) => {
  console.log("hello");
  try {
    const newComment = await comment.create(request.body);
    response.status(201).json(newComment);

  }
  catch (error) {
    console.log('Error create comment:', error.message);
    response.status(500).json({ error: error.message })

  }
};

