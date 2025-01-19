import { Schema, model } from "mongoose";
import { IStock } from "../types/modelTypes/stockTypes.js";

const stockSchema: Schema<IStock> = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please enter Product Name"],
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Please enter Store"],
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Please enter Supplier"],
    },
    costPrice: {
      type: Number,
      required: [true, "Please enter Cost Price"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Please enter Selling Price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter Quantity"],
    },
    purchaseDate: {
      type: Date,
      required: [true, "Please enter Purchase Date"],
    },
  },
  { timestamps: true }
);

const Stock = model<IStock>("Stock", stockSchema);

export default Stock;
