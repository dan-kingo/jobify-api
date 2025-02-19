import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;
//handle simple routes

app.get("/jobs", (_req: Request, res: Response) => {
  res.send("<h1>All Jobs here</h1>");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
