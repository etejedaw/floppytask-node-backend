import { z } from "zod";

export const PayloadTokenSchema = z
	.object({
		sub: z.string()
	})
	.readonly();

export type PayloadToken = z.infer<typeof PayloadTokenSchema>;
