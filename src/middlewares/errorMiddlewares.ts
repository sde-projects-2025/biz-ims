import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import ErrorHandler from "../utils/customError.js";
import { ControllerType } from "../types/commonTypes.js";
import { errorResponse } from "../utils/responseFunction.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // customizing cast error occuring due to inavallid id of mongodb document
  if (err.name === "CastError") err.message = "Invalid Id";

  res.status(err.statusCode).json(errorResponse(err.message, err));
  return;
};

// export const TryCatch =
//   (func: ControllerType) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     return Promise.resolve(func(req, res, next)).catch(next);
//   };

// export const TryCatch =
//   (func: ControllerType) =>
//   (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void | Response<any, Record<string, any>>> => {
//     return Promise.resolve(func(req, res, next)).catch(next);
//   };

export const TryCatch =
  (func: ControllerType): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
