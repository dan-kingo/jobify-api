import { Router } from "express";
import { validateData } from "../middlewares/validationMiddleware";
import { register } from "../controllers/userControllers";
import userSchemas from "../schema/userSchemas";

const userRouter = Router();

userRouter.post("/api/register", validateData(userSchemas), register);
export default userRouter;
