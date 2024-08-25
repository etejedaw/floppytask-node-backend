import { z } from "zod";

export const TaskIdParamsSchema = z
	.object({
		taskId: z.string().uuid()
	})
	.strict()
	.readonly();

export type TaskIdParams = z.infer<typeof TaskIdParamsSchema>;
