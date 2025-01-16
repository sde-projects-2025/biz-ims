import { Request, Response } from "express";

const getStoreData = (req: Request, res: Response) => {
  res.send({ success: true, message: "This is Store Page" });
};

export default getStoreData;
