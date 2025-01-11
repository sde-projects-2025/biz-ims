import { Request, Response } from "express";

const getCategoryData = (req: Request, res: Response) => {
  res.send({ success: true, message: "This is Category Page" });
};

export default getCategoryData;
