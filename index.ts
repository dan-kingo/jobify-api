import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import router from "./routes/jobRouter";

const app: Express = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logDirectory)) {
}
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  {
    flags: "a",
  }
);
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
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/", router);
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
