import express from "express";
import getRoleData from "../controllers/roleController.js";
const roleRouter = express.Router();

roleRouter.get("/role", getRoleData);

export default roleRouter;
