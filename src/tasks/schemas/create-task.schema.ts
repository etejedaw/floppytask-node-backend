import { z } from "zod";

export const CreateTaskSchema = z
	.object({
		title: z.string(),
		project: z.string().uuid().optional(), // DELETE OPTIONAL
		description: z.string(),
		notes: z.string().optional(),
		estimatedTime: z.number().positive().optional(),
		deadLine: z.string().date().optional(),
		startDate: z.string().date().optional(),
		endDate: z.string().date().optional(),
		isDone: z.boolean()
	})
	.strict();

export type CreateTask = z.infer<typeof CreateTaskSchema>;
