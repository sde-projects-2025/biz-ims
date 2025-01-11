import express from "express";
const categoryRouter = express.Router();

categoryRouter.get("/category", (req, res) => {
  res.send({ success: true, message: "This is Category Home Page" });
});

export default categoryRouter;
