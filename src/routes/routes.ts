import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";
import unitRoutes from "./unitRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/units", unitRoutes);
router.use("/products", productRoutes);

export default router;
