import { z } from "zod";

export const CreateProjectSchema = z
	.object({
		internalCode: z.string().optional(),
		title: z.string(),
		description: z.string().optional()
	})
	.strict();

export type CreateProject = z.infer<typeof CreateProjectSchema>;
