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
import validateOwnerMiddleware from "../middlewares/validateOwnerMiddleware";

const router = Router();
router.get(`/`, getAllJobs);
router.get(`/:id`, validateOwnerMiddleware, getJob);
router.post(`/`, validateData(schema), addJob);
router.put(`/:id`, validateData(schema), validateOwnerMiddleware, updateJob);
router.delete(`/:id`, validateOwnerMiddleware, deleteJob);

export default router;
