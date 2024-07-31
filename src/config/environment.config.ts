import { z } from "zod";
import { NodeEnv } from "./node-env.enum";

const EnvironmentSchema = z
	.object({
		PORT: z.string().default("3000").transform(Number),
		NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
		DB_NAME: z.string().default("mariadb"),
		DB_USERNAME: z.string().default("root"),
		DB_PASSWORD: z.string().default("toor"),
		DB_HOST: z.string().default("127.0.0.1"),
		DB_PORT: z.string().default("3306").transform(Number),
		JWT_SECRET: z.string().default("secret-token"),
		JWT_EXPIRES: z.string().default("1d")
	})
	.readonly();

export const environment = EnvironmentSchema.parse(process.env);
