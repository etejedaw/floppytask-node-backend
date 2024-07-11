import { z } from "zod";

export const ParamsSchema = z
	.object({
		id: z.string().uuid()
	})
	.strict()
	.readonly();

export type Params = z.infer<typeof ParamsSchema>;
