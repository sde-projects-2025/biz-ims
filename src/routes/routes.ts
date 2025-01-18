import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";
import supplierRoutes from "./supplierRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);

export default router;
