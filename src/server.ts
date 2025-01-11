import dotenv from "dotenv";
import { app } from "./app.js";
import { connectToMongoDB } from "./config/dbConnection.js";

dotenv.config();

//Connecting the Server to Mongo DB
connectToMongoDB(process.env.MONGO_DB_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
