import { z } from "zod";

const PasswordPolicy = z
	.string()
	.min(8, { message: "Password must be at least 8 characters long" })
	.max(15, { message: "Password must be at most 15 characters long" })
	.regex(/[a-z]/, {
		message: "Password must contain at least one lowercase letter"
	})
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter"
	})
	.regex(/\d.*\d/, { message: "Password must contain at least two numbers" })
	.regex(/[^a-zA-Z0-9]/, {
		message: "Password must contain at least one special character"
	});

export const RegisterSchema = z
	.object({
		name: z.string().optional(),
		email: z.string().email(),
		password: PasswordPolicy
	})
	.strict();

export type Register = z.infer<typeof RegisterSchema>;
