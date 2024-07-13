import { z } from "zod";

export const LoginSchema = z
	.object({
		email: z.string().email(),
		password: z.string()
	})
	.strict();

export type Login = z.infer<typeof LoginSchema>;
