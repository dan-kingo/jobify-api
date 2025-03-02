import { Router } from "express";
import { getCurrentUser } from "../controllers/usersControllers";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);

export default userRouter;
