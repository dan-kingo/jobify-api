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
router.get(`/`, getAllJobs);
router.get(`/:id`, getJob);
router.post(`/`, validateData(schema), addJob);
router.put(`/:id`, validateData(schema), updateJob);
router.delete(`/:id`, deleteJob);

export default router;
