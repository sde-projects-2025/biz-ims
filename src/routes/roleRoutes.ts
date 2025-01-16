import express from "express";
import {
  createRole,
  deleteRole,
  getAllRolesData,
  getRoleById,
  updateRole,
} from "../controllers/roleController.js";
const router = express.Router();

router.route("/all").get(getAllRolesData);
router.route("/new").post(createRole);
router.route("/:id").get(getRoleById).put(updateRole).delete(deleteRole);

export default router;
