import { z } from "zod";

export const IdParamsSchema = z
	.object({
		id: z.string().uuid()
	})
	.strict()
	.readonly();

export type IdParams = z.infer<typeof IdParamsSchema>;
