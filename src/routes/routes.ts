import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";
import supplierRoutes from "./supplierRoutes.js";
import unitRoutes from "./unitRoutes.js";
import productRoutes from "./productRoutes.js";
import storeRoutes from "./storeRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/units", unitRoutes);
router.use("/products", productRoutes);
router.use("/stores", storeRoutes);

export default router;
