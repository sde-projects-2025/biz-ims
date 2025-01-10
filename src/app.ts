import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/dbConnection.js";

dotenv.config();
const app = express();

//Connecting the Server to Mongo DB
connectToMongoDB(process.env.MONGO_DB_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
