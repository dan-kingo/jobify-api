import { Request, Response } from "express";
import schema from "../schema/jobSchemas";
import Job from "../models/jobs";

const getAllJobs = async (_req: Request, res: Response) => {
  const jobs = await Job.find();
  res.send(jobs);
};

const getJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  console.log(job);
  if (!job) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
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
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
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

const deleteJob = async (req: Request, res: Response) => {
  //first find the job
  let result = await Job.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
    return;
  }

  res
    .status(200)
    .json({ message: "Job Deleted Successfully", deletedJob: result });
};

export { updateJob, addJob, deleteJob, getAllJobs, getJob };
