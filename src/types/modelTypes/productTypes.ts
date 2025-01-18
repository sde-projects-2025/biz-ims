import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  productDesc: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  unitId: mongoose.Schema.Types.ObjectId;
  sku: string;
  isActive: boolean;
  image: string;
  thresholdStock: number;
  brand: string;
}

export interface NewProductReqBody {
  productName: string;
  productDesc: string;
  categoryId: string;
  unitId: string;
  sku: string;
  isActive: boolean;
  image: string;
  thresholdStock: number;
  brand: string;
}
