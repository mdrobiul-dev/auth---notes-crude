import { z } from "zod";

export const createNoteSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),

    content: z.string().trim().min(1, "Content is required"),
  })
  .strict();

export const updateNoteSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters")
      .optional(),

    content: z.string().trim().min(1, "Content is required").optional(),
  })
  .strict()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided for update",
  });               
