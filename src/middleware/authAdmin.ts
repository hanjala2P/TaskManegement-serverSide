import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

const authAdmin = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user; 

      if (!user) {
        throw new AppError(401, "You are not authorized!");
      }


      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new AppError(
          403,
          "Forbidden! You don't have permission to access this route."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authAdmin;