import { z } from "zod";

export const IdParamSchema = z
	.object({
		id: z.string().uuid()
	})
	.strict()
	.readonly();

export type Params = z.infer<typeof IdParamSchema>;
