import { z } from "zod";
import { CreateProjectSchema } from "./create-project.schema";

export const UpdateProjectSchema = CreateProjectSchema.partial();

export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
