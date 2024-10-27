import db from "./db/connection.js"// let db = mongoose.connection
import express from "express";
import logger from "morgan";
import chalk from "chalk";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import createBid from "./routes/bids.js"
import addBidComment from "./routes/bids.js"
import createJobPost from "./routes/contractor.js"
import getJobPost from "./routes/contractor.js"

const app = express();



app.use(cors());
app.use(express.json());
app.use(logger("dev"));




//Mounting routes

app.use('/api', createBid);
app.use('/api', createJobPost);
app.use('/api', getJobPost);
app.use('/api', addBidComment);
app.use('/api', signin);
app.use('/api', signup);


const PORT = process.env.PORT || 3000

db.on("connected", () => {
    console.clear()
    console.log(chalk.blue("Connected to MongoDB!"));
    app.listen(PORT, () => {
      console.log(`Express server running on port: ${PORT}`);
    });
})