import { Router } from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobControllers";
import { validateData } from "../middlewares/validationMiddleware";
import schema from "../schema/jobSchemas";

const router = Router();
const URL = "/api/jobs";
router.get(`${URL}`, getAllJobs);
router.get(`${URL}/:id`, getJob);
router.post(`${URL}`, validateData(schema), addJob);
router.put(`${URL}/:id`, validateData(schema), updateJob);
router.delete(`${URL}/:id`, deleteJob);

export default router;
