import { Request, Response } from "express";
import schema from "../schema/jobSchemas";
import Job from "../models/jobs";

const getAllJobs = (_req: Request, res: Response) => {
  res.send(jobs);
};

const getJob = (req: Request, res: Response) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    res.send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  res.send(job);
};

const addJob = async (req: Request, res: Response) => {
  const {
    title,
    description,
    company,
    location,
    jobType,
    salary,
    requirements,
    status,
  } = req.body;
  const job = await Job.create({
    title,
    description,
    company,
    location,
    jobType,
    salary,
    requirements,
    status,
  });
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
