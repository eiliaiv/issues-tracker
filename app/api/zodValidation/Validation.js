import { z } from "zod";

export const issuesSchema = z.object({
  title: z.string().min(1, "too short").max(20, "too long"),
  description: z.string().min(1, "too short").max(225, "too long"),
});

export const deleteIssueSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export const loginoutSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
})