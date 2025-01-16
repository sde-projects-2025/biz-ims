import { Request, Response } from "express";

const getRoleData = (req: Request, res: Response) => {
  res.send({ success: true, message: "This is Role Page" });
};

export default getRoleData;
