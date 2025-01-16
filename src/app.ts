import express from "express";

import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import router from "./routes/routes.js";

export const app = express();

app.use(express.json());

app.use("/api/v1", router);

//Error handling Middleware
app.use(errorMiddleware);
