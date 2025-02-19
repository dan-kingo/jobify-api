import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";

import router from "./routes/jobRouter";
import corsOptions from "./middlewares/corsOptionsMiddleware";
import accessLogStream from "./middlewares/morganLoggerMiddleware";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/", router);
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
