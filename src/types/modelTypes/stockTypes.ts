import { Document, Schema } from "mongoose";

export interface StockType {
  productId: string;
  storeId: string;
  supplierId: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  purchaseDate: Date;
}

export interface IStock
  extends Omit<StockType, "productId" | "storeId" | "supplierId">,
    Document {
  productId: Schema.Types.ObjectId;
  storeId: Schema.Types.ObjectId;
  supplierId: Schema.Types.ObjectId;
}

export interface NewStockReqBody extends StockType {}
