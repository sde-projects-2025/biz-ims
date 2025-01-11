import express from "express";
import categoryRouter from "./routes/categoryRoutes.js";
import userRouter from "./routes/userRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
import storeRouter from "./routes/storeRoutes.js";
export const app = express();

app.use("/api/v1", categoryRouter, userRouter, roleRouter, storeRouter);
