import express, { Express, Request, Response } from "express";

interface Job {
  id: string;
  company: string;
  salary: number;
  category:
    | "Web Development"
    | "IOS Development"
    | "Android Development"
    | "Front-End Development"
    | "Back-End Development"
    | "Graphics Design";
}

const jobs: Job[] = [
  {
    id: "jobId1",
    company: "Google",
    salary: 19_000,
    category: "Back-End Development",
  },
  {
    id: "jobId1",
    company: "Google",
    salary: 19_000,
    category: "Back-End Development",
  },
  {
    id: "jobId2",
    company: "Amazon",
    salary: 14_000,
    category: "Front-End Development",
  },
  {
    id: "jobId3",
    company: "Meta",
    salary: 21_000,
    category: "IOS Development",
  },
  {
    id: "jobId4",
    company: "Apple",
    salary: 21_000,
    category: "Android Development",
  },
  {
    id: "jobId5",
    company: "Tiktok",
    salary: 27_000,
    category: "Graphics Design",
  },
];
const app: Express = express();
const port = process.env.PORT || 3000;
//handle simple routes

// get all jobs
app.get("/jobs", (_req: Request, res: Response) => {
  res.send(jobs);
});

// get a single job
app.get("/jobs/:id", (req: Request, res: Response) => {
  const job: Job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.send(`Course with id ${req.params.id} is not found!`);
    return;
  }

  res.send(job);
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
