import { z } from "zod";

export const updateDocSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  announcement: z.string().optional(),
});
