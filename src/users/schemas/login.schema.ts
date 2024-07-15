import { z } from "zod";

export const LoginSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(1)
	})
	.strict()
	.readonly();

export type Login = z.infer<typeof LoginSchema>;
