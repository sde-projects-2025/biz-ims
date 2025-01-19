import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "../types/modelTypes/productTypes.js";

const ProductSchema: Schema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
      unique: [true, "Product Name Already Exist"],
    },
    productDesc: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is required"],
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Units",
      required: [true, "Product Unit is required"],
    },
    sku: {
      type: String,
      required: [true, "Sku is required"],
      trim: true,
    },
    isProductActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: [true, "Product Image is required"],
      trim: true,
    },
    thresholdStock: {
      type: Number,
      required: [true, "Threshold Stock is required"],
    },
    brand: {
      type: String,
      required: [true, "Product Brand is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export default Product;
