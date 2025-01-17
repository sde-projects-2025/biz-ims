import { Document } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  categoryDesc: string;
}

export interface NewCategoryReqBody {
  categoryName: string;
  categoryDesc: string;
}
