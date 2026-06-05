import { z } from "zod";

export const issuesSchema = z.object({
  title: z.string().min(1, "too short").max(20, "too long"),
  description: z.string().min(1, "too short").max(225, "too long"),
})