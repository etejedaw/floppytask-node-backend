import { z } from "zod";
import { RegisterSchema } from "./register.schema";

export const CreateUserSchema = RegisterSchema.extend({
	salt: z.string()
});

export type CreateUser = z.infer<typeof CreateUserSchema>;
