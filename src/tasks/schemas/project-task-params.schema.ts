import { z } from "zod";

export const ProjectTaskParamsSchema = z
	.object({
		projectId: z.string().uuid(),
		taskId: z.string().uuid()
	})
	.strict()
	.readonly();

export type ProjectTaskParams = z.infer<typeof ProjectTaskParamsSchema>;
