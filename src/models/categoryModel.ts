import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../types/categories/categoryType.js";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);

export default Category;
