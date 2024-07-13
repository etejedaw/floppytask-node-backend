import { z } from "zod";
import { RegisterSchema } from "./register.schema";

export const UpdateUserSchema = RegisterSchema.partial().omit({
	email: true
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
