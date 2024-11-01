import db from "./db/connection.js"// let db = mongoose.connection
import express from "express";
import logger from "morgan";
import chalk from "chalk";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import jobPostsRouter from "./routes/jobPosts.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use('/api/jobPosts', jobPostsRouter);
app.use('/api/users', usersRouter); 
app.use('/api/comments', commentsRouter); 

const PORT = process.env.PORT || 3000

db.on("connected", () => {
    console.clear()
    console.log(chalk.blue("Connected to MongoDB!"));
    app.listen(PORT, () => {
      console.log(`Express server running on port: ${PORT}`);
    });
})