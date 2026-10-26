import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../config";
import AppError from "./AppError"; 

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "You are not authorized! Token missing.");
      }

    
      const tokenString = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;

      if (!tokenString) {
        throw new AppError(401, "You are not authorized! Invalid token format.");
      }

      const verifiedToken = jwt.verify(
        tokenString,
        config.jwt.secret
      ) as JwtPayload;

      req.user = verifiedToken;
      next(); 
    } catch (error) {
     
      if (error instanceof TokenExpiredError) {
        return next(new AppError(401, "Token has expired! Please login again."));
      }
      next(error);
    }
  };
};

export default auth;