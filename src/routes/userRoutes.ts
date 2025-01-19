import express from "express";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/all").get(getAllUsers);
router.route("/new").post(addNewUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
