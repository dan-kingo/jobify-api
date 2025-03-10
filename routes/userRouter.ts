import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/usersControllers";
import { validateData } from "../middlewares/validationMiddleware";
import userSchemas from "../schema/userSchemas";
import authorizeMiddleware from "../middlewares/authorizeMiddleware";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);
userRouter.post("/update-user", validateData(userSchemas), updateUser);
userRouter.get(
  "/admin/app-stats",
  authorizeMiddleware(["admin"]),
  getApplicationStats
);

export default userRouter;
