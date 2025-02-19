import express, { Express, Request, Response } from "express";
import { z, ZodError } from "zod";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const schema = z.object({
  id: z.string().optional(),
  company: z.string(),
  salary: z.number().min(9000),
  category: z.enum([
    "Web Development",
    "IOS Development",
    "Android Development",
    "Front-End Development",
    "Back-End Development",
    "Graphics Design",
  ]),
});
type Job = z.infer<typeof schema>;

const jobs: Job[] = [
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
//handle simple routes

// get all jobs
app.get("/api/jobs", (_req: Request, res: Response) => {
  res.send(jobs);
});

// get a single job
app.get("/api/jobs/:id", (req: Request, res: Response) => {
  const job: Job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  res.send(job);
});

// add/post a job
app.post("/api/jobs", (req: Request, res: Response) => {
  try {
    const result = schema.parse(req.body);
    const job: Job = {
      id: `jobId${jobs.length + 1}`,
      company: result.company,
      salary: result.salary,
      category: req.body.category,
    };

    jobs.push(job);
    res.send(job);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.errors);
      const errorMessages = error.errors.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// handle job update method
app.put("/api/jobs/:id", (req: Request, res: Response) => {
  try {
    // first find the job
    let job = jobs.find((j) => j.id === req.params.id);
    if (!job) {
      res.status(404).send(`Job with id ${req.params.id} is not found!`);
      return;
    }
    const result = schema.parse(req.body);
    // update jobs
    Object.assign(job, result);

    res.send(job);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessages = err.errors.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// handle job delete method
app.delete("/api/jobs/:id", (req: Request, res: Response) => {
  //first find the job
  let job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  let index = jobs.indexOf(job);
  jobs.splice(index, 1);

  res.send(job);
});
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
