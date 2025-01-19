import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsData,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/all").get(getAllProductsData);
router.route("/new").post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
