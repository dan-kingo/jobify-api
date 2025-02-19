import express, { Express } from "express";
import router from "./routes/jobRouter";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
