import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";
import unitRoutes from "./unitRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/units", unitRoutes);

export default router;
