import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
