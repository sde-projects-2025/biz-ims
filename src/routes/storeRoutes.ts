import express from "express";
const storeRouter = express.Router();

storeRouter.get("/store", (req, res) => {
  res.send({ success: true, message: "This is Store Home Page" });
});

export default storeRouter;
