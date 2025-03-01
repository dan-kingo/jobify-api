import { Request, Response } from "express";
import mongoose from "mongoose";
import _ from "lodash";
import Job from "../models/jobs";
import { jobSchema } from "../schema/jobSchemas";
import { AuthRequest } from "../middlewares/authMiddleware";

const getAllJobs = async (req: AuthRequest, res: Response) => {
  console.log(req.user);
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
};

const getJob = async (req: Request<jobSchema>, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }
    const job = await Job.findById(id);
    if (!job) {
      res.status(404).send(`Job with id ${id} is not found!`);
      return;
    }
    res.send(job);
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
};

const addJob = async (req: Request<jobSchema>, res: Response) => {
  try {
    const job = await Job.create(
      _.pick(req.body, [
        "title",
        "company",
        "salary",
        "description",
        "location",
        "jobType",
        "requirements",
        "status",
      ])
    );
    res.send(job);
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
};

const updateJob = async (req: Request<jobSchema>, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }
    let updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedJob) {
      res.status(404).send(`Job with id ${id} is not found!`);
      return;
    }

    res.status(200).json({ message: "Job Updated Successfully", updatedJob });
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
};

const deleteJob = async (req: Request<jobSchema>, res: Response) => {
  //first find the job
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }
    let result = await Job.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send(`Job with id ${id} is not found!`);
      return;
    }

    res
      .status(200)
      .json({ message: "Job Deleted Successfully", deletedJob: result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error is occured!" });
  }
};

export { updateJob, addJob, deleteJob, getAllJobs, getJob };
