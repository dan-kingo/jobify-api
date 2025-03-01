import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import Job from "../models/jobs"; // Import Job model

const validateOwnerMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required!",
      });
      return;
    }

    const { userId, role } = req.user;
    const { id } = req.params; // Assuming the job ID is in the URL

    const job = await Job.findById(id);

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found!",
      });
      return;
    }

    const isAdmin = role === "admin";
    const isOwner = job.createdBy.toString() === userId;

    if (!isAdmin && !isOwner) {
      res.status(403).json({
        success: false,
        message: "Unauthorized access denied!",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error occurred!",
    });
  }
};

export default validateOwnerMiddleware;
