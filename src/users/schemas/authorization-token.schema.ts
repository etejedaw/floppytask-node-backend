import { z } from "zod";

export const AuthorizationTokenSchema = z
	.object({
		authorization: z.string()
	})
	.readonly();

export type AuthorizationToken = z.infer<typeof AuthorizationTokenSchema>;
