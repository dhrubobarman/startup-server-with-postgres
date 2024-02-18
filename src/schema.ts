import { z } from "zod";

export const TaskSchema = z.object({
  _id: z.number(),
  title: z.string().min(2, "Title must contain at least 2 character(s)"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  due_date: z.date().optional(),
  create_at: z.date(),
  updated_at: z.date(),
});
export type Task = z.infer<typeof TaskSchema>;
