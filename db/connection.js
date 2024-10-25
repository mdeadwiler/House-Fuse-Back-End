import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("returnOriginal", false);
//mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("disconnected", () => {
    console.log(chalk.bold("disconnected from MongoDB!"));
});

mongoose.connection.on("error", (err) => {
    console.log(chalk.red(`MongoDB connection error: ${err}`))
})


export default mongoose.connection;