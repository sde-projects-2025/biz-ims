import { Schema, model } from "mongoose";
import { IStore } from "../types/modelTypes/storeTypes.js";

const storeSchema: Schema<IStore> = new Schema(
  {
    storeName: {
      type: String,
      required: [true, "Please enter Store Name"],
    },
    storeAddress: {
      type: String,
      required: [true, "Please enter Store Address"],
    },
    storeContact: {
      type: String,
      required: [true, "Please enter Store Contact Number"],
    },
    isStoreActive: {
      type: Boolean,
      default: true,
    },
    storeManagerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Store = model<IStore>("Store", storeSchema);

export default Store;
