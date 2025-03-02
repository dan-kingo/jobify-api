import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import debug from "debug";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import router from "./routes/jobRouter";
import corsOptions from "./middlewares/corsOptionsMiddleware";
import accessLogStream from "./middlewares/morganLoggerMiddleware";
import authRouter from "./routes/authRouter";
import authMiddleware from "./middlewares/authMiddleware";
import userRouter from "./routes/userRouter";

const app: Express = express();
const port = process.env.PORT || 3000;
const appDebug = debug("app:startup");
const dbDebug = debug("app:db");

//conect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => dbDebug("connected to database!"))
  .catch((err) => {
    dbDebug(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined", { stream: accessLogStream }));
}

app.use("/api/jobs", authMiddleware, router);
app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, userRouter);

app.listen(port, () => {
  appDebug(`server started at port ${port}`);
});
