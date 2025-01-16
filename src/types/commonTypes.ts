import { NextFunction, Response, Request } from "express";

// export type ControllerType = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => Promise<void | Response<any, Record<string, any>>>;

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>>>;
