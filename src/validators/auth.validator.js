import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must atleast have 2 character").max(50, "Name cannot exceed 50 character"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "password must atleast have 6 character"),
});

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Please provide a password"),
});

export const updateProfileSchema = z
  .object({
    name: z.string().min(2, "Name must atleast have 2 character").max(50, "Name cannot exceed 50 character").optional(),
    password: z.string().min(6, "password must atleast have 6 character").optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided for update",
  });


