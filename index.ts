import express, { Express } from "express";
import cors from "cors";
import router from "./routes/jobRouter";

const app: Express = express();
const port = process.env.PORT || 3000;
import { CorsOptions } from "cors";

const whitelist: string[] = [
  "http://localhost:3000",
  "https://www.google.com",
  "https://dan-kingo.netlify.app",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOptions;

app.use(express.json());
app.use(cors(corsOptions));
app.use("/", router);
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
