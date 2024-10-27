import db from "../db/connection.js";
import comment from "../models/comment.js";


const insertData = async () => {
  await db.dropDatabase();
  const comments = [
    {
      content: "comment",
      author: "author detail",
      jobPost: "Plumping",
    },
    {
      content: "comment",
      author: "author detail",
      jobPost: "Plumping",
    }
  ]
  await comment.create(comments)

  await db.close();

}




insertData();