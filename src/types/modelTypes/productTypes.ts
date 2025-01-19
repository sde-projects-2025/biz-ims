import mongoose, { Document } from "mongoose";

export interface ProductType {
  productName: string;
  productDesc: string;
  categoryId: string;
  unitId: string;
  sku: string;
  isProductActive: boolean;
  image: string;
  thresholdStock: number;
  brand: string;
}
export interface IProduct
  extends Omit<ProductType, "categoryId" | "unitId">,
    Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  unitId: mongoose.Schema.Types.ObjectId;
}

export interface NewProductReqBody extends ProductType {}
