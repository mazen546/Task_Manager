import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../config/allowedOrigins";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const origin = req.headers.origin as string;
  console.log(origin);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
