import express from "express";
import {
  createUnit,
  deleteUnit,
  getUnitById,
  getAllUnits,
  updateUnit,
} from "../controllers/unitController.js";
const router = express.Router();

router.route("/all").get(getAllUnits);
router.route("/new").post(createUnit);
router.route("/:id").get(getUnitById).put(updateUnit).delete(deleteUnit);

export default router;
