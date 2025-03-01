import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "authentication is invalid!",
    });
    return;
  }
  next();
};

export default authMiddleware;
