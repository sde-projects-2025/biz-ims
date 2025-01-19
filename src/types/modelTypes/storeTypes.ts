import { Schema, Document } from "mongoose";

export interface StoreType {
  storeName: string;
  storeAddress: string;
  storeContact: string;
  isStoreActive: boolean;
  storeManagerId: string;
}

export interface IStore extends Omit<StoreType, "storeManagerId">, Document {
  storeManagerId: Schema.Types.ObjectId;
}
export interface NewStoreReqBody extends StoreType {}
