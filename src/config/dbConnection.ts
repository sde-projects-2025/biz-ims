import mongoose from "mongoose";

export const connectToMongoDB = async (
  connectionString: string | undefined
) => {
  await mongoose
    .connect(connectionString ?? "")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Failed to connect to MongoDB");
    });
};