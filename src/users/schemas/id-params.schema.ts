import { z } from "zod";

export const IdParamsSchema = z
	.object({
		userId: z.string().uuid()
	})
	.strict()
	.readonly();

export type IdParams = z.infer<typeof IdParamsSchema>;
