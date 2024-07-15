import { z } from "zod";

const EnvironmentSchema = z
	.object({
		PORT: z.string().default("3000").transform(Number),
		NODE_ENV: z.string().default("dev"),
		DB_NAME: z.string().default("madiadb"),
		DB_USERNAME: z.string().default("root"),
		DB_PASSWORD: z.string().default("toor"),
		DB_HOST: z.string().default("127.0.0.1"),
		DB_PORT: z.string().default("3306").transform(Number),
		JWT_SECRET: z.string().default("secret-token"),
		JWT_EXPIRES: z.string().default("1d")
	})
	.readonly();

export const environment = EnvironmentSchema.parse(process.env);
