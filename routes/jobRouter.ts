import { Router } from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobControllers";

const router = Router();
const URL = "/api/jobs";
router.get(`${URL}`, getAllJobs);
router.get(`${URL}/:id`, getJob);
router.post(`${URL}`, addJob);
router.put(`${URL}/:id`, updateJob);
router.delete(`${URL}/:id`, deleteJob);

export default router;
