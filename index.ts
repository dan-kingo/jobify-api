import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import debug from "debug";

import router from "./routes/jobRouter";
import corsOptions from "./middlewares/corsOptionsMiddleware";
import accessLogStream from "./middlewares/morganLoggerMiddleware";

const app: Express = express();
const port = process.env.PORT || 3000;
const appDebug = debug("app:startup");

app.use(express.json());
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined", { stream: accessLogStream }));
}
app.use("/", router);
app.listen(port, () => {
  appDebug(`server started at port ${port}`);
});
