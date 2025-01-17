import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";
import userRoutes from "./userRoutes.js";
import supplierRoutes from "./supplierRoutes.js";
import unitRoutes from "./unitRoutes.js";
import productRoutes from "./productRoutes.js";
import stockRoutes from "./stockRoutes.js";
import storeRoutes from "./storeRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/units", unitRoutes);
router.use("/products", productRoutes);
router.use("/stocks", stockRoutes);
router.use("/stores", storeRoutes);

export default router;
