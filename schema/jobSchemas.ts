import { z } from "zod";
const schema = z.object({
  id: z.string().optional(),
  title: z.string(),
  company: z.string(),
  salary: z.number().min(9000).optional(),
  description: z.string(),
  location: z.string(),
  jobType: z.enum([
    "Full-Time",
    "Part-Time",
    "Contract",
    "Freelance",
    "Internship",
  ]),
  requirements: z.string().array().optional(),
  status: z.enum(["Open", "Closed"]),
});

export type jobSchema = z.infer<typeof schema>;

export default schema;
