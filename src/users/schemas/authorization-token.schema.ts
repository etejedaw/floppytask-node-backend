import { z } from "zod";

export const AuthorizationTokenSchema = z
	.object({
		authorization: z.string({ message: "Bearer Token Not Found" })
	})
	.readonly();

export type AuthorizationToken = z.infer<typeof AuthorizationTokenSchema>;
