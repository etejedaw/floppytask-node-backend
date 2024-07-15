import { z } from "zod";

export const IdParamsSchema = z
	.object({
		projectId: z.string().uuid()
	})
	.strict()
	.readonly();

export type IdParams = z.infer<typeof IdParamsSchema>;
