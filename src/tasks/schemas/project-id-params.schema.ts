import { z } from "zod";

export const ProjectIdParamsSchema = z
	.object({
		projectId: z.string().uuid()
	})
	.strict()
	.readonly();

export type ProjectIdParams = z.infer<typeof ProjectIdParamsSchema>;
