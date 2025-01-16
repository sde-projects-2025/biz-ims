import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import roleRoutes from "./roleRoutes.js";

const router = express.Router();

router.use("/role", roleRoutes);
router.use("/category", categoryRoutes);

export default router;
