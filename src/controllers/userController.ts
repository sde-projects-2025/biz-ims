import { Request, Response } from "express";

const getUserData = (req: Request, res: Response) => {
  res.send({ success: true, message: "This is User Page" });
};

export default getUserData;
