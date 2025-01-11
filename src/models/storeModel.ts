import { Schema, Document, model } from "mongoose";
interface IStore extends Document {
  storeName: string;
  storeAddress: string;
  phone: string;
  isStoreActive: boolean;
  storeManagerId: Schema.Types.ObjectId;
}

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
    phone: {
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
