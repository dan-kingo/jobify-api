import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware"; // Import AuthRequest type

const authorizeMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};

export default authorizeMiddleware;
