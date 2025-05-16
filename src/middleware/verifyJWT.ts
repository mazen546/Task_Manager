import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: string;
  roles?: string[];
}

const verifyJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer ")) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  const token = authHeader?.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string, // Type assertion as env vars are often strings
    (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden (invalid token)
      }
      if (decoded && typeof decoded !== "string" && decoded.UserInfo) {
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
      } else {
        return res.sendStatus(403); // Forbidden (invalid decoded payload)
      }
    }
  );
};

export default verifyJWT;
