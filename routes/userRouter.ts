import { Router } from "express";
import { validateData } from "../middlewares/validationMiddleware";
import { login, register } from "../controllers/userControllers";
import userSchemas from "../schema/userSchemas";

const userRouter = Router();

userRouter.post("/register", validateData(userSchemas), register);
userRouter.post("/login", login);
export default userRouter;
