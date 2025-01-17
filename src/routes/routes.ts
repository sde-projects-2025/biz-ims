import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);

export default router;
