import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesData,
  getCategoryById,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/all").get(getAllCategoriesData);
router.route("/new").post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
