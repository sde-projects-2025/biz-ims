import { Document } from "mongoose";
export interface CategoryType {
  categoryName: string;
  categoryDesc: string;
  isCategoryActive: boolean;
}

export interface ICategory extends CategoryType, Document {}

export interface NewCategoryReqBody extends CategoryType {}
