import { Request, Response } from "express";
import jobs from "../models/jobs";
import schema, { Job } from "../schema/jobSchemas";

const getAllJobs = (_req: Request, res: Response) => {
  res.send(jobs);
};

const getJob = (req: Request<Job>, res: Response) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  res.send(job);
};

const addJob = (req: Request, res: Response) => {
  const result = schema.parse(req.body);
  const job = {
    id: `jobId${jobs.length + 1}`,
    company: result.company,
    salary: result.salary,
    category: req.body.category,
  };

  jobs.push(job);
  res.send(job);
};

const updateJob = (req: Request<Job>, res: Response) => {
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
};

const deleteJob = (req: Request<Job>, res: Response) => {
  //first find the job
  let job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  let index = jobs.indexOf(job);
  jobs.splice(index, 1);

  res.send(job);
};

export { updateJob, addJob, deleteJob, getAllJobs, getJob };
