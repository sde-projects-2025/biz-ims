import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../types/modelTypes/categoryTypes.js";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
      // unique: [true, "Category Name Already Exist"],
    },
    categoryDesc: {
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
