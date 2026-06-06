import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must atleast have 2 character").max(50),
  email: z.string().email("Please provide a email"),
  password: z.string().min(6, "password must atleast have 6 character"),
});

export const loginSchema = z.object({
  email: z.string().email("Please provide a email"),
  password: z.string().min(1, "Please provide a password"),
});

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).max(50).optional(),
    password: z.string().min(6).optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided for update",
  });


