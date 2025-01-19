import express from "express";
import {
  addNewStock,
  deleteStockDetails,
  getAllStocksDetails,
  getStocksDetailsById,
  updateStockDetails,
} from "../controllers/stockController.js";

const router = express.Router();

router.route("/all").get(getAllStocksDetails);
router.route("/new").post(addNewStock);
router
  .route("/:id")
  .get(getStocksDetailsById)
  .put(updateStockDetails)
  .delete(deleteStockDetails);

export default router;
