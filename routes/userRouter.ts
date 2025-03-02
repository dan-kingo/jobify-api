import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/usersControllers";
import { validateData } from "../middlewares/validationMiddleware";
import userSchemas from "../schema/userSchemas";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);
userRouter.post("/update-user", validateData(userSchemas), updateUser);

export default userRouter;
