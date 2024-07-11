import { z } from "zod";
import { CreateTaskSchema } from "./create-task.schema";

export const UpdateTaskSchema = CreateTaskSchema.partial();

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
