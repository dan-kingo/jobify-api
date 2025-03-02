import { Router } from "express";
import { validateData } from "../middlewares/validationMiddleware";
import { login, logout, register } from "../controllers/authControllers";
import userSchemas from "../schema/userSchemas";

const authRouter = Router();

authRouter.post("/register", validateData(userSchemas), register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
