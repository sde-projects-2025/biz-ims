import { Schema, Document } from "mongoose";

export interface IStore extends Document {
  storeName: string;
  storeAddress: string;
  storeContact: string;
  isStoreActive: boolean;
  storeManagerId: Schema.Types.ObjectId;
}
