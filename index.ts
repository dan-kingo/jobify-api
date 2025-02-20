import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import debug from "debug";
import mongoose from "mongoose";

import router from "./routes/jobRouter";
import corsOptions from "./middlewares/corsOptionsMiddleware";
import accessLogStream from "./middlewares/morganLoggerMiddleware";

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
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined", { stream: accessLogStream }));
}
app.use("/", router);
app.listen(port, () => {
  appDebug(`server started at port ${port}`);
});
