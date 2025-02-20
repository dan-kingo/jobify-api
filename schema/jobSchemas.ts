import { z } from "zod";
const schema = z.object({
  id: z.string().optional(),
  company: z.string(),
  salary: z.number().min(9000),
  category: z.enum([
    "Web Development",
    "IOS Development",
    "Android Development",
    "Front-End Development",
    "Back-End Development",
    "Graphics Design",
  ]),
});

export default schema;
