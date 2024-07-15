import { z } from "zod";

export const PayloadTokenSchema = z
	.object({
		sub: z.string()
	})
	.strict()
	.readonly();

export type PayloadToken = z.infer<typeof PayloadTokenSchema>;
