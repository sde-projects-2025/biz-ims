import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../types/modelTypes/categoryTypes.js";
import { boolean } from "joi";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
      unique: [true, "Category Name Already Exist"],
    },
    categoryDesc: {
      type: String,
    },
    isCategoryActive: {
      type: Boolean,
      default: true,
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
