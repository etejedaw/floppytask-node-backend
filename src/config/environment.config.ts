import { z } from "zod";

const EnvironmentSchema = z
	.object({
		PORT: z.string().transform(Number),
		DB_NAME: z.string(),
		DB_USERNAME: z.string(),
		DB_PASSWORD: z.string(),
		DB_HOST: z.string(),
		DB_PORT: z.string().transform(Number)
	})
	.readonly();

export const environment = EnvironmentSchema.parse(process.env);
