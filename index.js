import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

dotenv.config();

app.use(express.json());

app.use(cookieParser());

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to mongoDB is successfull!");
  } catch (error) {
    console.error(error);
  }
};

app.use("/api", userRoute); //user

app.use("/api", authRoute); //auth

app.listen(port, () => {
  connectionToDB();
  console.log(`server started ${port}`);
});