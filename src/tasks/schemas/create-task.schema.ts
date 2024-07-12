import { z } from "zod";

export const CreateTaskSchema = z
	.object({
		title: z.string(),
		description: z.string().optional(),
		notes: z.string().optional(),
		estimatedTime: z.number().positive().optional(),
		deadLine: z.string().date().optional()
	})
	.strict();

export type CreateTask = z.infer<typeof CreateTaskSchema>;
