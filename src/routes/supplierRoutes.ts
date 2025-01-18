import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliersData,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplierController.js";
const router = express.Router();

router.route("/all").get(getAllSuppliersData);
router.route("/new").post(createSupplier);
router
  .route("/:id")
  .get(getSupplierById)
  .put(updateSupplier)
  .delete(deleteSupplier);

export default router;
