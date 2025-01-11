import express from "express";
const roleRouter = express.Router();

roleRouter.get("/role", (req, res) => {
  res.send({ success: true, message: "This is Role Home Page" });
});

export default roleRouter;
