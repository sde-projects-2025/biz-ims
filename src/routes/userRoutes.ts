import express from "express";
import getUserData from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/user", getUserData);

export default userRouter;
