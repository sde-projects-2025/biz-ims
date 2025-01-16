import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";

export const getAllCategories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json(successResponse(null, "Hello From Category Controller"));
  }
);
