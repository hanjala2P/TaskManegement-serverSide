import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().optional(),
    bio: z.string().optional(),
    dateOfBirth: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    dateOfBirth: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};