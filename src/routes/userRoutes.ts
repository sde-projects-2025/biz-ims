import express from "express";
const userRouter = express.Router();

userRouter.get("/usr", (req, res) => {
  res.send({ success: true, message: "This is User Home Page" });
});

export default userRouter;
