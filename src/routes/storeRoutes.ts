import express from "express";
import {
  createStore,
  updateStore,
  deleteStore,
  getAllStoresData,
  getStoreById,
} from "../controllers/storeController.js";
const router = express.Router();

router.route("/all").get(getAllStoresData);
router.route("/new").post(createStore);
router.route("/:id").get(getStoreById).put(updateStore).delete(deleteStore);

export default router;
