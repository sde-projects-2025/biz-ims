import express from "express";
import getCategoryData from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.get("/category", getCategoryData);

export default categoryRouter;
