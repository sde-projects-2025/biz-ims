import express from "express";
import getStoreData from "../controllers/storeController.js";
const storeRouter = express.Router();

storeRouter.get("/store", getStoreData);

export default storeRouter;
