import { z } from "zod";

const userSchemas = z.object({
  firstName: z
    .string({ message: "first name is required" })
    .min(5, { message: "minimum 5 characters are allowed!" })
    .max(50, { message: "maximum 50 characters are allowed!" }),
  lastName: z
    .string({ message: "last name is required" })
    .min(5, { message: "minimum 5 characters are allowed!" })
    .max(50, { message: "maximum 50 characters are allowed!" }),
  email: z
    .string({ message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(1024)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  location: z.string({ message: "location is required" }),
  role: z.enum(["user", "admin"]),
});

export type userSchema = z.infer<typeof userSchemas>;

export default userSchemas;
