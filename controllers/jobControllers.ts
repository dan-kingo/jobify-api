import { Request, Response } from "express";
import Job from "../models/jobs";
import { jobSchema } from "../schema/jobSchemas";

const getAllJobs = async (_req: Request, res: Response) => {
  const jobs = await Job.find();
  res.send(jobs);
};

const getJob = async (req: Request<jobSchema>, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
    return;
  }
  res.send(job);
};

const addJob = async (req: Request<jobSchema>, res: Response) => {
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

const updateJob = async (req: Request<jobSchema>, res: Response) => {
  let updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    res.status(404).send(`Job with id ${req.params.id} is not found!`);
    return;
  }

  res.status(200).json({ message: "Job Updated Successfully", updatedJob });
};

const deleteJob = async (req: Request<jobSchema>, res: Response) => {
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
