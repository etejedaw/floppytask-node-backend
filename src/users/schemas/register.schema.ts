import { z } from "zod";

export const RegisterSchema = z
	.object({
		name: z.string().optional(),
		email: z.string().email(),
		password: z.string()
	})
	.strict();

export type Register = z.infer<typeof RegisterSchema>;
